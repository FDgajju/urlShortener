import { SET_ASYNC, GET_ASYNC } from '../server.js';
import urlModel from '../models/urlModel.js';

const redirectUrl = async function (req, res) {
  try {
    let { urlCode } = req.params;
    // console.log(urlCode1)

    const getAsync = await GET_ASYNC(`${urlCode}`);
    console.log(getAsync);
    if (getAsync) {
      const parseData = JSON.parse(getAsync);
      console.log('Data Fetch');
      //console.log(typeof urlCode)
      return res.redirect(parseData.longUrl);
    } else if (urlCode) {
      // console.log(url)
      const urlFind = await urlModel.findOne({ urlCode: urlCode });
      //console.log(urlFind)
      if (urlFind) {
        const storeCacheData = await SET_ASYNC(`${urlCode}`, JSON.stringify(urlFind), 'EX', 20);
        console.log('Data Got Stored', storeCacheData);
        return res.status(302).redirect(urlFind.longUrl);
      } else {
        return res.status(400).send({
          status: false,
          message: 'There is No Short Url Found',
        });
      }
    } else {
      return res.status(404).send({ status: false, message: 'No Url Code Params Found' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default redirectUrl;
