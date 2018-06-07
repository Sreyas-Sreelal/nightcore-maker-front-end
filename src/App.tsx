import {Alert,Button,Classes,Colors,FileInput,FormGroup, Icon} from "@blueprintjs/core"
import '@blueprintjs/core/lib/css/blueprint.css'
import * as React from 'react';
import './App.css';



class App extends React.Component<any,any>
{

  constructor(props:any)
  {
    super(props)
    this.state={
      error_alert:false,
      error_state:"",
      file:null,
      filename:"Choose a mp3 file",
      
    }
    this.OnFileUpload = this.OnFileUpload.bind(this);
    this.CloseAlert = this.CloseAlert.bind(this);
  }
  
  public OnFileUpload(e:any)
  {
    if(e.target.files[0].name.search('.mp3') === -1)
    {
      this.setState({error_state:"Please upload mp3 file"});
      this.setState({error_alert:true});
    }
    else
    {
      this.setState({error_state:""});
      this.setState({filename: e.target.files[0].name});
      this.setState({file:e.target.files[0]});
      this.setState({error_alert:false});
    }
    
  }
  public render() 
  {
    return (
    <div className={Classes.DARK}>
      <div className={Classes.LARGE} >
      
      <h1 className={Classes.TEXT_MUTED} style={{ color:Colors.INDIGO4}}>NightCore Maker  <Icon icon="headset" iconSize={50}/>
      </h1>
        <FormGroup
          className={Classes.UI_TEXT_LARGE}
        >
        
        <FileInput 
            disabled={false} 
            text={this.state.filename} 
            className={Classes.INTENT_WARNING} 
            onChange= {this.OnFileUpload }
            style={{ color:Colors.LIME4}}/>
        <Alert 
              confirmButtonText={"Ok"} 
              cancelButtonText={"Cancel"} 
              onCancel={this.CloseAlert} 
              onClose={this.CloseAlert} 
              onConfirm={this.CloseAlert} 
              canOutsideClickCancel={true} 
              transitionDuration={2000} 
              isOpen={this.state.error_alert}
              className={Classes.DARK}
        >
          {this.state.error_state}
        </Alert><br/><br/><br/>
        <Button text="Convert" style={{ background:Colors.ORANGE5,color:Colors.WHITE}}/> 
        </FormGroup>
        
      </div>
    </div>
        
    );
  }
  private CloseAlert(e:any)
  {
    this.setState({error_alert:false});
    this.setState({error_state:""});
  }
}

export default App;
