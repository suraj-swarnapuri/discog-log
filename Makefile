.PHONY: build
build:
	cd frontend && npm run build
	go build -o bin/discogify
.PHONY: run
run:
	./bin/discogify

.PHONY: server
server: build run

