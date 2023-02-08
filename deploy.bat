yarn docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f https://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@github.com/Floyd-bit/blog.git master:deploy
