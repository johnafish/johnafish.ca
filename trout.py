#Trout, written by John Fish in July 2013.
import os, argparse, sys, time
#Import headers and footer. Each are seperate text files containing within them the code for the half of the code before and after their respective sides of the article. articleList is the list of written articles (simple enough!)
parser = argparse.ArgumentParser(description="Create a static set of webpages from text files.")
parser.add_argument('-w', nargs=1)
parser.add_argument('-n', nargs=1)
args = parser.parse_args()
curPath = os.getcwd()

def writeFile(fileName):
    article = open(curPath+'/input/rawarticles/'+fileName, 'r+')
    articleHTML = open(curPath+'/output/writing/'+fileName+'.html', 'w')
    os.chdir(curPath)
    headerOne = open('input/headerOne', 'r+')
    headerTwo = open('input/headerTwo', 'r+')
    footer = open('input/footer', 'r+')
    article_type = article.readline()
    title = article.readline()
    featuretext = article.readline()
    articleHTML.write(headerOne.read()+title+headerTwo.read()+article.read()+footer.read())
        

def resetAll():
    writeHeaderToArticlePage()
    os.chdir("input/rawarticles")
    articles = []
    for files in os.listdir("."):
        articles.append(files)
    print(articles)
    articles.sort(key=lambda x: os.path.getctime(x))
    articles.reverse()
    print(articles)
    for article in articles:
        writeFile(article)
        writeFilesToArticlePage(article)
    os.chdir("input/rawarticles")
    writeFooterToArticlePage()

def writeHeaderToArticlePage():
    articlePage = open('output/writing/index.html', 'w')
    headerArticles = open('input/headerArticles', 'r+')
    articlePage.write(headerArticles.read())

def writeFilesToArticlePage(fileName):
    os.chdir(curPath)
    article_file = "{0}/input/rawarticles/{1}".format(curPath, fileName)
    articlePage = open('output/writing/index.html', 'a')
    article = open('input/rawarticles/'+fileName, 'r+')
    modified_time = time.ctime(os.path.getctime(article_file)).split()
    user_time = str(modified_time[0]+" "+modified_time[1]+" "+modified_time[2]+", "+modified_time[4])
    articlePage.write('<li class="articleitem '+article.readline()+'"><a class="articletitle" href="'+fileName+'.html">'+article.readline()+'</a><br /><span class="featuretext">'+article.readline()+'</span><br /><span class="date">Created '+user_time+'</span><br /><br /></li>')
    
def writeFooterToArticlePage():
    os.chdir(curPath)
    articlePage = open('output/writing/index.html', 'a')
    footerArticles = open('input/footerArticles', 'r+')
    articlePage.write(footerArticles.read())
    
    
if args.w[0].lower() == "f":
    if args.n == None:
        fileName = input("What is the file name?")
    else:
        fileName = args.n[0]
    writeFile(fileName)
elif args.w[0].lower() == "r":    
    resetAll()
else:
    input("What would you like to do (f/r) ")
    if input.lower() == "f":
        if args.n == None:
            fileName = input("What is the file name?")
        else:
            fileName = args.n[0]
        writeFile(fileName)
    elif input.lower() == "r":
        resetAll()
    

