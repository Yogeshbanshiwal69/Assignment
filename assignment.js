const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/getTimeStories', async (req, res) => {
  
  try {
    const u = 'https://time.com';
    const r = await axios.get(u);

    if (r.status === 200) {
      const h = r.data;
      const l = [];
      const s = h.indexOf('<h2 class="latest-stories__heading">');
      const e = h.indexOf('</ul>', s);
      const lh = h.substring(s, e + 5);
      const si = lh.split('</li>');
      
      si.forEach((i) => {
        const ts = i.indexOf('<h3 class="latest-stories__item-headline">') + 42;
        const te = i.indexOf('</h3>', ts);
        const t = i.substring(ts, te).trim();
        const ls = i.indexOf('<a href="') + 9;
        const le = i.indexOf('">', ls);
        const lk = u + i.substring(ls, le);
        l.push({ title: t, link: lk });
      });
      
      res.json(l.slice(0, 6));
    } else {
      res.status(r.status).json({ error: 'Failed to retrieve the page' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
