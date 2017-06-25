node_modules: package.json yarn.lock
	yarn install
	touch $@

test: node_modules
	npm test
.PHONY: test
