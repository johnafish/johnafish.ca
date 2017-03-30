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



def indexEntry(fileName):
	indexFile.write("<li class='work'><a href='"+fileName+".html'>"+nameFormat(fileName)+"</a></li>")


def writeFiles():
	indexFile.write(headerOne)
	indexFile.write(nameFormat("works"))
	indexFile.write(headerTwo)
	indexFile.write("<ul class='workList'>")

	for file in os.listdir("."):
		if(file[-3:]==".md"):
			fileName = file[:-3]
			out=open(fileName+".html", "w")
			writeFile(out, fileName, open(file, "r").read())
			indexEntry(fileName)
			out.close()

	indexFile.write("</ul>")
	indexFile.write(footer)
	indexFile.close()

if (__name__ == "__main__"):
	writeFiles()