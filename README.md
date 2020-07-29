[![GitHub Actions](https://github.com/Ray-Garraty/frontend-project-lvl2/workflows/Run_linter_and_tests/badge.svg)](https://github.com/Ray-Garraty/frontend-project-lvl2/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/879c931256464ef64186/maintainability)](https://codeclimate.com/github/Ray-Garraty/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/879c931256464ef64186/test_coverage)](https://codeclimate.com/github/Ray-Garraty/frontend-project-lvl2/test_coverage)

# gendiff
a compact cli tool for quick and demonstrative files comparison
___
### About  
**__gendiff__** compares content of the two (nested) files of the following extensions:
* .json
* .yml
* .ini  

...and outputs the result in the terminal in three possible formats:  
* "_stylish_": demostrative tree-like structure
* "_plain_": verbose plain text
* "_json_": json-like string
___
### Installation
Clone this repo
```
make install
make link  
```
___
### Usage
```  
gendiff [options] <filepath1> <filepath2>
Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```
___
### Usage examples
##### Comparing two .json files:  
> [![asciicast](https://asciinema.org/a/347464.svg)](https://asciinema.org/a/347464)
##### Comparing two .yml files:  
> [![asciicast](https://asciinema.org/a/347465.svg)](https://asciinema.org/a/347465)
##### Comparing two .ini files:  
> [![asciicast](https://asciinema.org/a/347466.svg)](https://asciinema.org/a/347466)
