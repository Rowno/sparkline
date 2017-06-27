BIN := ./node_modules/.bin
BUILD_IGNORE = '**/*.story.js,**/*.test.js'
export BABEL_ENV = commonjs

node_modules: package.json yarn.lock
	yarn install
	touch $@

test: node_modules
	$(BIN)/xo
	$(BIN)/ava
.PHONY: test

test-watch: node_modules
	$(BIN)/ava --watch
.PHONY: test-watch

test-update-snapshots: node_modules
	$(BIN)/ava --update-snapshots
.PHONY: test-watch

commonjs: node_modules
	BABEL_ENV=commonjs $(BIN)/babel src --out-dir commonjs --ignore $(BUILD_IGNORE)

es6: node_modules
	BABEL_ENV=es6 $(BIN)/babel src --out-dir es6 --ignore $(BUILD_IGNORE)

build: commonjs es6
.PHONY: build

clean:
	rm -rf commonjs es6
.PHONY: clean

server: node_modules
	$(BIN)/start-storybook -p 9001 -c storybook
.PHONY: server
