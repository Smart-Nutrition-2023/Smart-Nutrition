import { birthdays } from '../../components/calendar/renderDay';

export default function modifyBirthdays(req, res) {
  const days = req.body;
  if (req.method === 'POST') {
    console.log('REQBODY', typeof days, days);
    res.status(200).json(days);
  } else if (req.method === 'GET') {
    console.log('PROGRESS?');
    res.status(200).json(days);
  }
  //   try {
  //     const days = req.body;
  //     console.log('REQBODY', typeof days, days);
  //     res.status(200).json(days);
  //   } catch (err) {
  //     res.status(500).json({ statusCode: 500, message: err.message });
  //   }
}
