BIN := ./node_modules/.bin

node_modules: package.json yarn.lock
	yarn install
	touch $@

test: node_modules
	npm test
.PHONY: test

server: node_modules
	$(BIN)/start-storybook -p 9001 -c storybook
.PHONY: server
