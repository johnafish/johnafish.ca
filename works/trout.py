import markdown, os

path = os.getcwd()

headerOne = open("headerOne", "r").read()
headerTwo = open("headerTwo", "r").read()
footer = open("footer", "r").read()
indexFile = open("index.html", "w")

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

def writeFiles():
	indexFile.write(headerOne)
	indexFile.write(nameFormat("works"))
	indexFile.write(headerTwo)
	indexFile.write("<ul class='workList'>")

	for file in os.listdir("."):
		if(file[-3:]==".md"):
			fileName = file[:-3]

			out=open(fileName+".html", "w")
			fileContent = open(file, "r")
			date = fileContent.readline().split(",")
			writeFile(out, fileName, fileContent.read())
			indexEntry(fileName, date)
			out.close()

	indexFile.write("</ul>")
	indexFile.write(footer)
	indexFile.close()

if (__name__ == "__main__"):
	writeFiles()