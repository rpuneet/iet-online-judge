import React , {Component} from 'react';
import './App.css';
import ReactAce from 'react-ace-editor';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const editorStyle = {
  height: '600px',
  borderWidth:'20px',
  fontSize: "20px",
  margin: "0px 20px 20px 20px"
}

class App extends Component {
  state = {
    code: "",
    language: "Language",
    output: "",
    verdict: "",
  }
  onChange = (newValue, event) => {
    const editor = this.ace.editor;
    this.setState({code: editor.getValue()})
  }
  onSubmit = () => {
    const submission = {
      code: this.state.code,
      language: this.state.language
    }
    axios.post('/api/submit' , submission)
      .then(res => {
        this.setState({
          output: res.data.output,
          verdict: res.data.verdict
        })
      }).catch(err => console.log(err))
  }
  handleClose = () => {

  }
  render() {
    const verdict = this.state.verdict === 'Successful' ?
    (<span style={{
      color:'#1B5E20'
    }}>{this.state.verdict}</span>) :
    (<span style={{
      color:'#b71c1c'
    }}>{this.state.verdict}</span>)

    const output = this.state.verdict === "" ? null : (
      <div className='Output'>
      <Paper style={{padding: "10px" , backgroundColor: "#B0BEC5"}}>
        <p>Verdict: {verdict}</p>
        <p>Output:</p>
        <p>{this.state.output}</p>
        </Paper>
      </div>
    )

    return (
      <div className='App'>
       <div className='Header'>
          <Typography variant="h4" style={{color: "white",flexGrow: 1, margin: "10px 20px"}}>
            IET Online Judge
          </Typography>
        </div>
        <Select
          id="language-selector"
          value={this.state.language}
          onChange={(e) => this.setState({language: e.target.value})}
          style={{
            margin: "20px 0px 0px 20px",
            fontSize: "20px"
          }}
        >
          <MenuItem value='Language'
          style={{
            fontSize: "20px",
            padding: "10px",
            margin: "0px"
          }}
          >Language</MenuItem>
          <MenuItem value='C' style={{
            fontSize: "20px",
            padding: "10px",
            margin: "0px"
          }}
          >C</MenuItem>
          <MenuItem value='C++'
          style={{
            fontSize: "20px",
            padding: "10px",
            margin: "0px"
          }}>C++</MenuItem>
          <MenuItem value='Python'
          style={{
            fontSize: "20px",
            padding: "10px",
            margin: "0px"
          }}>Python</MenuItem>
        </Select>

        <ReactAce
          className='Editor'
          mode="python"
          theme="monokai"
          setReadOnly={false}
          onChange={this.onChange}
          style={editorStyle}
          ref={instance => { this.ace = instance; }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            fontSize: "20px",
            margin:"0px 20px",
            padding: "6px 6px 0px 6px"
          }}
          onClick={this.onSubmit}
        >
          Submit
        </Button>
        {output}
      </div>
    );
  }
}
export default App
