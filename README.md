watmm-ae
========

autechre did an interview on watmm but it goes on for pages and would be impossible to skim. these scripts scrape the board and filter out just rob and seans posts. it could probably be adapted to scrape any phpbb type contraption.

1. `npm install`
2. `node fetch URL` - downloads the posts
3. `node posts` - scrapes header/footer and combines the posts into one file
4. `node json` - processes the post html into a json structure
5. `node ae` - pulls out the posts you want to read

