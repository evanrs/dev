import crypto from 'crypto';
import { type NextApiHandler } from 'next';
import { app } from 'lib/github';

export default <NextApiHandler>function GithubAppEventsHandler(req, res) {
  console.log('req.headers', req.headers);
  console.log('req.body', req.body);
  console.log('req.method req.url', req.method, req.url);

  const signature = req.headers['x-hub-signature-256'];
  const event = req.headers['x-github-event'];
  const id = req.headers['x-github-delivery'];
  const body = req.body;

  if (!signature || !event || !id || !body) {
    return res
      .status(400)
      .send('Bad Request: Missing required headers or body');
  }

  const hmac = crypto.createHmac('sha256', app.webhookSecret);
  hmac.update(JSON.stringify(body));
  const digest = `sha256=${hmac.digest('hex')}`;

  if (digest !== signature) {
    return res.status(400).send('Invalid signature');
  }

  return res.status(200).json(true);
};
