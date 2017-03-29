import markdown, os

file = open('test.md', 'r')
out = open("test.html", "w")

out.write(markdown.markdown(file.read()))