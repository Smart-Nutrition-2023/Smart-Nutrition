export default function dummy({ query : { id }}, res) {
    console.log("dynnn")
    res.status(200).json({message : `${id}`});
  }
  
  