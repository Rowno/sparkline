BIN := ./node_modules/.bin
BUILD_IGNORE = '**/*.story.js,**/*.test.js'

node_modules: package.json yarn.lock
	yarn install
	touch $@

test: node_modules
	npm test
.PHONY: test

commonjs: node_modules .babelrc
	BABEL_ENV=commonjs $(BIN)/babel src --out-dir commonjs --ignore $(BUILD_IGNORE)
	touch $@

es6: node_modules .babelrc
	BABEL_ENV=es6 $(BIN)/babel src --out-dir es6 --ignore $(BUILD_IGNORE)
	touch $@

build: commonjs es6
.PHONY: build

clean:
	rm -rf commonjs es6
.PHONY: clean

server: node_modules
	$(BIN)/start-storybook -p 9001 -c storybook
.PHONY: server
