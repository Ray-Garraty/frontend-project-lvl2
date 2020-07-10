install:
	npm install

publish:
	npm publish ./  --dry-run

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

pull:
	git pull https://github.com/Ray-Garraty/frontend-project-lvl2.git
