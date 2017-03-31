import markdown, os

path = os.getcwd()

headerOne = open("works/headerOne", "r").read()
headerTwo = open("works/headerTwo", "r").read()
footer = open("works/footer", "r").read()
indexFile = open("works/index.html", "w")
home = open("index.html", "w")

def nameFormat(name):
	return name

def writeFile(out, name, content):
	out.write(headerOne)
	out.write(nameFormat(name))
	out.write(headerTwo)
	out.write(markdown.markdown(content))
	out.write(footer)

def indexEntry(fileName, date):
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	month = months[int(date[1])-1]
	indexFile.write("<hr><li class='work'><a href='"+fileName+".html'>"+nameFormat(fileName)+"</a><span class='date'>"+month+" "+date[0]+", "+date[2]+"</li>")

def writeFeatured(featuredArticle):
	home.write(open("works/indexHeader", "r").read())
	home.write(markdown.markdown(featuredArticle))
	home.write(footer)

def writeFiles():
	indexFile.write(headerOne)
	indexFile.write(nameFormat("works"))
	indexFile.write(headerTwo)
	indexFile.write("<ul class='workList'>")

	articles = {}

	for file in os.listdir("works"):
		if(file[-3:]!=".md"):
			continue
		fileName = file[:-3]

		inp = open("works/"+file, "r")
		date = inp.readline().split(",")
		articles[fileName] = int(date[2])*365+int(date[1])*30+int(date[0])
		inp.close()

	featured = False

	for fileName in sorted(articles, key=articles.__getitem__, reverse=True):
		inp = open("works/"+fileName+".md", "r")
		out=open("works/"+fileName+".html", "w")

		if not featured:
			featured=True
			inp.readline()
			writeFeatured(inp.read())
			inp.close()
			inp = open("works/"+fileName+".md", "r")

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