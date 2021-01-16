from selenium import webdriver
import os
import csv
import time
import sys
from time import sleep
import requests
import pandas as pd

titles = []
diffs = []
conts = []


def overwrite():
    with open('leetcode_data.csv', 'w') as file:
        writer = csv.writer(file, lineterminator='\n') #specified line ending
        writer.writerow(['Title', 'Difficulty', 'Content'])


def get_problems():
    driver = webdriver.Chrome(executable_path="chromedriver_win32/chromedriver.exe")
    driver.get("https://leetcode.com/problemset/all/")
    time.sleep(2.5)

    table = driver.find_element_by_xpath("//div[contains(@class, 'table')]")
    rows = table.find_elements_by_tag_name('a')

    problem_list = []
    for row in rows:
        link = row.get_attribute('href')
        if 'problem' in link and not 'all' in link:
            problem_list.append(link)

    driver.quit()
    return problem_list


def textify(webelem):
    return webelem.text.encode(sys.stdout.encoding, errors='replace')


def scrape_problem(url):
    driver = webdriver.Chrome(executable_path="chromedriver_win32/chromedriver.exe")
    driver.get(url)
    time.sleep(2.5)

    try:
        title = driver.find_element_by_xpath("//div[contains(@class, 'css-v3d350')]")
        difficulty = driver.find_element_by_xpath("//div[@diff]")
        content = driver.find_element_by_xpath("//div[contains(@class, 'content__u3I1')]")

        titles = (textify(title))
        diffs = (textify(difficulty))
        conts = (textify(content))

        with open('leetcode_data.csv', 'a', newline='') as file:
            writer = csv.writer(file, lineterminator='\n')
            writer.writerow([titles, diffs, conts])

    except:
        print("Error scraping " + url)

    driver.quit()


def scrape_leetcode():
    overwrite()

    problem_list = get_problems()

    for link in problem_list:
        scrape_problem(link)


def test():
    overwrite()
    scrape_problem("https://leetcode.com/problems/two-sum/")


def send_to_database(file_name):
    # uploads csv file to dropbase DB
    token = open(file_name, "r")  # haha security, github scrapper bots got nothing on me
    # get signed url for document upload:
    uploadURL = requests.post('https://api2.dropbase.io/v1/pipeline/generate_presigned_url', data={'token': token})
    sleep(2)
    # sleep is becuase this process takes time and i dont feel like writting a better function than sleep even tho i could
    r = requests.put(
        uploadURL.json()['upload_url'],
        data=open(file_name, 'rb'))
    sleep(5)
    print(r)


def get_questions():
    query = requests.get('https://query.dropbase.io/FeXuiMBJmuAHKTQmfECFPs/problem_set', headers={
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhYmFzZUlkIjoiRmVYdWlNQkptdUFIS1RRbWZFQ0ZQcyIsImFjY2Vzc1Blcm0iOiJmdWxsIiwidG9rZW5JZCI6ImpQSHJoYWQxZDlkMTk0MTlIVHdJU2VhbjhYQnpRRk1HZGRWZGV0Mms0Y2R1Y2lBejJ1RWlqMEIxUTBvRHZEdTUiLCJpYXQiOjE2MTA4MjQxOTYsImV4cCI6MTYxMTE2OTc5NiwiaXNzIjoiZHJvcGJhc2UuaW8iLCJzdWIiOiJiN2t3YTVxY25oQXdaUU5IcjZaOURUIn0.Key6mwgGstGIx2X7sO7fYMbmrDVEQQoBX6XA6loenws'})
    return query.json()


if __name__ == "__main__":
    # test()
    scrape_leetcode()
    send_to_database("dropbase_api_token.txt")
    print(get_questions()) #testing purposes
