ORDERED_TESTS = test/core.js

test:	
	./node_modules/.bin/mocha $(ORDERED_TESTS) --reporter spec

.PHONY: test