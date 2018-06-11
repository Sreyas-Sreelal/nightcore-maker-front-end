import {Alert,Button,Classes,Colors,FileInput,FormGroup, Icon,Overlay} from "@blueprintjs/core"
import '@blueprintjs/core/lib/css/blueprint.css'
import * as React from 'react';

import './App.css';
/*
Configuration for backend server
*/ 
export const API_HOST_IP = "localhost";
export const API_PORT = "5000";
export const ENDPOINT = "//" + API_HOST_IP + ":" + API_PORT;

class App extends React.Component<any,any>
{
  constructor(props:any)
  {
    super(props)
    this.state={
      converted:false,
      converteddata:{
        directory:'',
        nameoffile:'',
      },
      converting:false,
      error_alert:false,
      error_state:"",
      file:null,
      filename:"Choose a mp3 file",
      fileuploaded:false,
      
    };

    this.OnFileUpload = this.OnFileUpload.bind(this);
    this.CloseAlert = this.CloseAlert.bind(this);
    this.StartConvert = this.StartConvert.bind(this);
    this.CloseOverlay = this.CloseOverlay.bind(this);
  }
  
  public OnFileUpload(e:any)
  {
    try{

      this.setState({converted:false})
      if(e.target.files[0].name.search('.mp3') === -1)
      {
        this.setState({error_state:"Please upload mp3 file"});
        this.setState({error_alert:true});
        this.setState({fileuploaded:false});
        this.setState({filename: "Choose a mp3 file"});
        this.setState({file:null});
      }
      else
      {
        this.setState({error_state:""});
        this.setState({filename: e.target.files[0].name});
        this.setState({file:e.target.files[0]});
        this.setState({error_alert:false});
        this.setState({fileuploaded:true});
      }
    }
    catch{ 
        this.setState({error_state:"Please upload mp3 file"});
        this.setState({error_alert:true});
        this.setState({fileuploaded:false});
        this.setState({filename: "Choose a mp3 file"});
        this.setState({file:null});
    }  
  }
  public render() 
  {
    return (
      <div className={Classes.DARK}>
          
          <Overlay isOpen={this.state.converted} className={Classes.OVERLAY_INLINE} hasBackdrop={true} onClose={this.CloseOverlay} usePortal={false} canEscapeKeyClose={true} canOutsideClickClose={true} autoFocus={true} enforceFocus={true} >
              <div className={Classes.DARK} style={{position:'relative'}}>
                <h3>Conversion Successful</h3>
                <p>
                  Your nightcore is created :) click below button to download
                </p>
                <a href={ENDPOINT + '/'+ this.state.converteddata.directory + this.state.converteddata.nameoffile} download={this.state.converteddata.nameoffile}>
                  <Button text="Download" style={{ background:Colors.GREEN3,color:Colors.WHITE }}/> 
                </a>
              </div>
            </Overlay>

        <div className={Classes.LARGE} >
          <h1 className={Classes.TEXT_MUTED} style={{ color:Colors.INDIGO4}}>NightCore Maker  <Icon icon="headset" iconSize={50}/>
          </h1>
            <FormGroup
              className={Classes.UI_TEXT_LARGE}
            >
            <FileInput 
                disabled={this.state.converting} 
                text={this.state.filename} 
                className={Classes.INTENT_WARNING} 
                onChange= {this.OnFileUpload }
                style={{ color:Colors.LIME4}}
            />
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
            <Button text="Convert" style={{ background:Colors.ORANGE3,color:Colors.WHITE }} onClick={this.StartConvert} loading={this.state.converting}/> 
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

  private CloseOverlay(e:any)
  {
    this.setState({converted:false})
  }

  private StartConvert()
  {
    this.setState({converted:false});
    if(this.state.fileuploaded){
      // tslint:disable:no-console
      console.log("poooo ",this.state.file);
      const data = new FormData();
      data.append('song', this.state.file);
      this.setState({converting:true});
     fetch(ENDPOINT + '/uploader', {
          body: data,  
          method: 'POST',
          mode: 'cors',
        
      }).then((response) => {
        
        response.json().then(rawdata =>{
          // tslint:disable:no-console
          console.log(JSON.stringify(rawdata,null));
          this.setState({converteddata:rawdata})
          this.setState({error_state:""});
          this.setState({error_alert:false});
          this.setState({converting:false});
          this.setState({converted:true});
          this.setState({filename:"Choose a mp3"});
          this.setState({files:null});
          this.setState({fileuploaded:false})
        })
        
      }).catch((e) => {
        this.setState({error_state:"Internal Server Error please try again"});
        this.setState({error_alert:true});
        this.setState({converted:false});
        this.setState({converting:false});
        this.setState({fileuploaded:false})
      });
    }
    else
    {
      this.setState({error_state:"First upload a mp3 file to convert"});
      this.setState({error_alert:true});
    }
  }
}
export default App;
