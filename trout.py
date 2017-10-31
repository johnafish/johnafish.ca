import markdown, os

path = os.getcwd()

headerOne = open("notes/headerOne", "r").read()
headerTwo = open("notes/headerTwo", "r").read()
footer = open("notes/footer", "r").read()
indexFile = open("notes/index.html", "w")
home = open("index.html", "w")

def nameFormat(name):
    """Capitalizes the first letter in a string"""
    return name[0].upper()+name[1:]

def writeFile(out, name, content):
    """Writes headers and content to an output HTML file"""
    out.write(headerOne)
    out.write(nameFormat(name))
    out.write(headerTwo)
    out.write(markdown.markdown(content))
    out.write(footer)

def indexEntry(fileName, date):
    """Writes title, date to works/index.html"""
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month = months[int(date[1])-1]
    indexFile.write("<li class='work'><a href='"+fileName+".html'>"+nameFormat(fileName)+"</a><span class='date'>"+month+" "+date[0]+", "+date[2]+"</li>")

def writeFeatured():
    home.write(open("notes/indexHeader", "r").read())
    home.write(footer)

def writeFiles():
    indexFile.write(headerOne)
    indexFile.write(nameFormat("Notes"))
    indexFile.write(headerTwo)
    indexFile.write("<ul class='workList'>")

    articles = {}

    for file in os.listdir("notes"):
        if(file[-3:]!=".md"):
            continue
        fileName = file[:-3]

        inp = open("notes/"+file, "r")
        date = inp.readline().split(",")
        articles[fileName] = int(date[2])*365+int(date[1])*30+int(date[0])
        inp.close()

    featured = False

    for fileName in sorted(articles, key=articles.__getitem__, reverse=True):
        inp = open("notes/"+fileName+".md", "r")
        out=open("notes/"+fileName+".html", "w")

        if not featured:
            featured=True
            writeFeatured()

        date = inp.readline().split(",")
        writeFile(out, fileName, inp.read())
        indexEntry(fileName, date)
        inp.close()
        out.close()

    indexFile.write("</ul>")
    indexFile.write(footer)
    indexFile.close()

if (__name__ == "__main__"):
	writeFiles()
