ORDERED_TESTS = test/core.js

test:	
	./node_modules/.bin/mocha $(ORDERED_TESTS) -t 7000 --reporter spec

.PHONY: test