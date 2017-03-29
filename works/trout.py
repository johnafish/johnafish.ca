import markdown, os

path = os.getcwd()

def nameFormat(name):
	return name

def writeFile(out, name, content):
	out.write(header1)
	out.write(nameFormat(name))
	out.write(header2)
	out.write(markdown.markdown(content))
	out.write(footer)

def indexEntry(fileName):
	return True

def writeFiles():
	for file in os.listdir("."):
		if(file[-3:]=".md"):
			fileName = file[:-3]
			out=open(fileName+".html", "w")
			writeFile(out, fileName, file.read())
			indexEntry(fileName)


file = open('test.md', 'r')
out = open("test.html", "w")

out.write(markdown.markdown(file.read()))