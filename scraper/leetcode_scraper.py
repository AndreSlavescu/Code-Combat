from selenium import webdriver
import os
import csv
import time
import sys

titles = []
diffs = []
conts = []


def overwrite():
    with open('leetcode_data.csv', 'w') as file:
        writer = csv.writer(file)
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
            writer = csv.writer(file)
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


if __name__ == "__main__":
    # test()
    scrape_leetcode()
