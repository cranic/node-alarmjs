REPORTER = spec

test:
	@./node_modules/.bin/mocha \
	        --reporter $(REPORTER) \
	        --ui tdd \
            --bail \
	        test/*-test.js

doc:
	@./node_modules/.bin/yuidoc lib \
	        -o ./doc

.PHONY: test doc
