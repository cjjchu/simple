#!/bin/bash
# mocha test/account.test.js -t 5000
# mocha test/comment.test.js -t 5000
# mocha test/apar.test.js -t 20000
# mocha test/wish.test.js -t 20000
# mocha test/notice.test.js -t 20000
mocha test/*.test.js -t 200000
