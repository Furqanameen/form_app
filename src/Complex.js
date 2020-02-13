import React from 'react';
import './assets/App.css';
import './assets/basscss.css'
import './assets/style.css';

class Complex extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playText: "Play",
      form_type: "Complex",
      playIcon: true,
      container_array:  [
                          {
                            id:1,
                            compaign_name: "",
                            operator: '',
                            field: "",
                            lb_window: "",
                            matric:"",
                            matric_operator: "",
                            matric_field: "",
                            complex_lb_window: "",
                            complex_matric:"",
                            complex_operator: "",
                            complex_matric_field: "",
                            rule_name:'',
                          }
                        ],
    };
  }

  play_click = async() =>{
    await this.setState({playIcon: !this.state.playIcon})
    if(this.state.playIcon){
      this.setState({playText: "Play"})
    }else{
      this.setState({playText: "Pause"})
    }
  }

  render_icon = () =>{

    if (this.state.playIcon){
      return(
        <span id="enabler-icon" onClick ={this.play_click}>&#10095;</span>
      )
    }else{
      return(
        <span id="enabler-icon" onClick ={this.play_click}>&#8545;</span>
      )
    }
  }

  trigger_press = () =>{
    var temp_array = this.state.container_array
    temp_array.push({id: this.state.container_array.length+1,status: "AND",compaign_name: "",operator: '',field: "",second_row:[{id: 1,matric:"",operator: "", field: "", lb_window: ""}],rule_name:''})
    this.setState({container_array: temp_array})
  }

  change_object = (event,obj_id,field_name) =>{
    var temp_array = this.state.container_array
    temp_array[obj_id-1][field_name] = event.target.value
    this.setState({container_array: temp_array})
  }

  delete_container = (container_id) =>{
    var temp_array = this.state.container_array
    temp_array = temp_array.filter(function(row) { 
                                              return row.id !== container_id 
                                            });
    this.setState({container_array: temp_array})
  }

  submit_form = () =>{
    try{
      alert("Add url here   https://localhost:3000/filter")
      fetch("https://localhost:3000/filter", {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify({
          rules_type: this.state.form_type,
          rules: this.state.container_array
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) =>{
        console.log(error);
      });
    }catch(e){
      console.log('error', e);
    }
  }

  render_if_row = (data) =>{
    return(
      <div class="repeat-item flex items-center">
            <div style={{display:"flex",justifyContent:'center',alignItems:'center',margin:"5px"}}>
              IF
            </div>
            <div class="col-4" style={{"margin":"0px"}}>
              <select class="repeat-el col-12 no-right-border" onChange={(e) => this.change_object(e,data.id,"complex_matric")} value={data.complex_matric} >
                <option value="" disabled selected>Metric</option>
                <option value="Impressions">Impressions</option>
                <option value="Clicks (all)">Clicks (all)</option>
                <option value="Link clicks">Link clicks</option>
                <option value="Cost">Cost</option>
                <option value="CPC (all)">CPC (all)</option>
                <option value="CPC (cost per link click)">CPC (Cost Per Link Click)</option>
                <option value="CTR (link click-through rate)">CTR (Link Click-Through Rate)</option>
                <option value="Conversion value of purchase on Facebook">Conversion value of purchase on Facebook</option>
                <option value="Website purchases">Website purchases</option>
                <option value="Website purchases CVR">Website purchases CVR</option>
                <option value="Cost per website purchase">Cost per website purchase</option>
                <option value="Website Purchase ROAS">Website Purchase ROAS</option>
                <option value="Website adds to cart">Website adds to cart</option>
                <option value="Website adds to cart CVR">Website adds to cart CVR</option>
                <option value="Website Lead">Website Lead</option>
                <option value="Website Lead CVR">Website Lead CVR</option>
              </select>
            </div>
            <div class="col-3" style={{"margin":"1px","margin-left": "3px"}}>
              <select class="repeat-el no-side-borders col-12" onChange={(e) => this.change_object(e,data.id,"complex_operator")} value={data.complex_operator}>
                <option value="" disabled selected>Operator</option>
                <option value="<"> {"<"} </option>
                <option value="<=">{"<="}</option>
                <option value=">">{">"}</option>
                <option value=">=">{">="}</option>
                <option value="=">{"="}</option>
              </select>
            </div>

            <div class="col-4" style={{"margin":"2px", "margin-right": "4px"}}>
              <input
                class="col-12 repeat-el "
                type="text"
                size="10"
                onChange={(e) => this.change_object(e,data.id,"complex_field")}
                value={data.complex_field}
                maxlength="256"
                style={{"font-size": "12pt"}}
              />
            </div>
            <div class="col-4" style={{"margin":"1px", padding: "1px"}}>
              <select
                class="repeat-el no-right-border col-12" onChange={(e) => this.change_object(e,data.id,"complex_lb_window")} value={data.complex_lb_window}>
                <option value="" disabled selected>LB Window</option>
                <option value="1 Day">1 Day</option>
                <option value="2 Days">2 Days</option>
                <option value="3 Days">3 Days</option>
                <option value="4 Days">4 Days</option>
                <option value="5 Days">5 Days</option>
                <option value="6 Days">6 Days</option>
                <option value="1 Week">1 Week</option>
                <option value="2 Weeks">2 Weeks</option>
                <option value="3 Weeks">3 Weeks</option>
                <option value="4 Weeks">4 Weeks</option>
                <option value="5 Weeks">5 Weeks</option>
                <option value="6 Weeks">6 Weeks</option>
                <option value="7 Weeks">7 Weeks</option>
                <option value="8 Weeks">8 Weeks</option>
                <option value="9 Weeks">9 Weeks</option>
                <option value="10 Weeks">10 Weeks</option>
              </select>
            </div>
      </div>
    )        
  }

  render_then_row = (data) =>{
    return(
      <div class="repeat-item flex items-center">
            <div style={{display:"flex",justifyContent:'center',alignItems:'center',margin: "5px"}}>
              THEN
            </div>
            <div class="col-4" style={{"margin":"0px"}}>
              <select class="repeat-el col-12 no-right-border" onChange={(e) => this.change_object(e,data.id,"matric")} value={data.matric} >
                <option value="" disabled selected>Metric</option>
                <option value="Impressions">Impressions</option>
                <option value="Clicks (all)">Clicks (all)</option>
                <option value="Link clicks">Link clicks</option>
                <option value="Cost">Cost</option>
                <option value="CPC (all)">CPC (all)</option>
                <option value="CPC (cost per link click)">CPC (Cost Per Link Click)</option>
                <option value="CTR (link click-through rate)">CTR (Link Click-Through Rate)</option>
                <option value="Conversion value of purchase on Facebook">Conversion value of purchase on Facebook</option>
                <option value="Website purchases">Website purchases</option>
                <option value="Website purchases CVR">Website purchases CVR</option>
                <option value="Cost per website purchase">Cost per website purchase</option>
                <option value="Website Purchase ROAS">Website Purchase ROAS</option>
                <option value="Website adds to cart">Website adds to cart</option>
                <option value="Website adds to cart CVR">Website adds to cart CVR</option>
                <option value="Website Lead">Website Lead</option>
                <option value="Website Lead CVR">Website Lead CVR</option>
              </select>
            </div>
            <div class="col-3" style={{"margin":"1px","margin-left": "3px"}}>
              <select class="repeat-el no-side-borders col-12" onChange={(e) => this.change_object(e,data.id,"matric_operator")} value={data.matric_operator}>
                <option value="" disabled selected>Operator</option>
                <option value="<"> {"<"} </option>
                <option value="<=">{"<="}</option>
                <option value=">">{">"}</option>
                <option value=">=">{">="}</option>
                <option value="=">{"="}</option>
              </select>
            </div>

            <div class="col-4" style={{"margin":"2px", "margin-right": "4px"}}>
              <input
                class="col-12 repeat-el "
                type="text"
                size="10"
                onChange={(e) => this.change_object(e,data.id,"matric_field")}
                value={data.matric_field}
                maxlength="256"
                style={{"font-size": "12pt"}}
              />
            </div>
            <div class="col-4" style={{"margin":"1px", padding: "1px"}}>
              <select
                class="repeat-el no-right-border col-12" onChange={(e) => this.change_object(e,data.id,"lb_window")} value={data.lb_window}>
                <option value="" disabled selected>LB Window</option>
                <option value="1 Day">1 Day</option>
                <option value="2 Days">2 Days</option>
                <option value="3 Days">3 Days</option>
                <option value="4 Days">4 Days</option>
                <option value="5 Days">5 Days</option>
                <option value="6 Days">6 Days</option>
                <option value="1 Week">1 Week</option>
                <option value="2 Weeks">2 Weeks</option>
                <option value="3 Weeks">3 Weeks</option>
                <option value="4 Weeks">4 Weeks</option>
                <option value="5 Weeks">5 Weeks</option>
                <option value="6 Weeks">6 Weeks</option>
                <option value="7 Weeks">7 Weeks</option>
                <option value="8 Weeks">8 Weeks</option>
                <option value="9 Weeks">9 Weeks</option>
                <option value="10 Weeks">10 Weeks</option>
              </select>
            </div>
      </div>
    )        
  }

  render_complex_container = () =>{
    return(
      this.state.container_array.map((data)  => {
        return(
          <div id="base_condition_group_1" class="repeat-section flex items-center" >
            <div class="repeat-items flex-auto">
              <div  style={{display: "flex","padding-top": "0px", border: '1px solid #fff'}}>
                <div style={{flex:1}}>
                  <div class="repeat-item flex items-center">
                    <div class="col-12" style={{"margin":"0px","margin-right": "1px"}}>
                      <input
                        placeholder="Rule Name"
                        class="col-12 repeat-el "
                        type="text"
                        onChange={(e) => this.change_object(e,data.id,"rule_name")}
                        value={data.rule_name}
                        size="10"
                        maxlength="256"
                        style={{"font-size": "12pt"}}
                      />
                    </div>
                  </div>
                  <div class="fixed-item flex items-center">
                    <div class="col-4" style={{"margin":"0px"}}>
                      <select class="repeat-el col-12 no-right-border" style={{background:"white"}} onChange={(e) => this.change_object(e,data.id,"compaign_name")} value={data.compaign_name}>
                        <option value="Campaign Name" selected>Campaign Name</option>
                        <option value="Ad Set Name">Ad Set Name</option>
                        <option value="Ad Name">Ad Name</option>
                      </select>
                    </div>
                    <div class="col-4" style={{"margin":"1px"}}>
                      <select class="repeat-el no-side-borders col-12" onChange={(e) => this.change_object(e,data.id,"operator")} value={data.operator}>
                        <option value="" disabled selected>Operator</option>
                        <option value="equals">Equals</option>
                        <option value="contains">Contains</option>
                        <option value="does not contain">Does not contain</option>
                      </select>
                    </div>
                    <div class="col-4" style={{"margin":"0px","margin-right": "4px"}}>
                      <input
                        class="col-12 repeat-el "
                        type="text"
                        onChange={(e) => this.change_object(e,data.id,"field")}
                        value={data.field}
                        size="10"
                        maxlength="256"
                        style={{"font-size": "12pt"}}
                      />
                    </div>
                  </div>
                  <div>
                    {
                      this.render_if_row(data)
                    }
                  </div>
                  <div>
                    {
                      this.render_then_row(data)
                    }
                  </div>
                </div>
              </div>
              { this.render_delete_button(data)}
            </div>          
          </div>          
        )
      })
    )
  }

  change = (event) =>{
    window.location.href = "/";
  }

  render_container = () =>{
    if (this.state.form_type == "Complex"){
      return(
        this.render_complex_container()      
      )
    }
  }

  show_trigger_btn = () =>{
    if (this.state.form_type == "Complex"){
      return(
        <div class="rule-set" onClick={this.trigger_press}>New Rule</div>         
      )
    }
  }

  render_submit_button = () =>{
    if (this.state.container_array.length > 0){
      return (
        <input type="button" onClick ={this.submit_form} class="submit-btn" value="Submit" id="submit_button" />
      )
    }
  }

  render_delete_button = (data) =>{
    if (this.state.container_array.length > 1 && data.id != 1){
      return(
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:'flex-end'}}>
          <input type="button" onClick={(e) => this.delete_container(data.id)} class="submit-btn" value="Delete" id="submit_button" />
        </div>
      )
    }
  }

    
  render(){
    return (
      <div id="page" style={{"max-width": "900px;"}}>
        <br />
        <div style={{display:"flex",flexDirection: 'row'}}>
          <div class="col-3"  style={{"padding-left":"20px"}}>
            <select class="repeat-el col-8 no-right-border" onChange={this.change} value={this.state.form_type}>
              <option value="Simple" selected>Simple</option>
              <option value="Complex">Complex</option>
            </select>
          </div>
          <div class="col-2" style={{"padding-left":"20px"}}>
            <select class="repeat-el col-6 no-right-border" >
              <option value="Facebook Ads" selected>Facebook Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Google Analysis">Google Analysis</option>
            </select>
          </div>
          <div class="col-5"></div>
        </div>  
        <br />

        <div class="flex">
          <div class="ml3 p1 enabler rounded cursor-pointer center" >
            {
              this.render_icon()
            }
          </div>
          <div class="flex flex-column ml1">
            <span id="enabler-text" class="bold" >
              {this.state.playText}
            </span>
            <span class="h6 text-light-gray">Ad set</span>
          </div>
        </div>
        <br />
        <form class="pure-form pure-form-stacked" id="rules_form">
            <div id="base" class="base repeat-section flex flex-column rounded p2" >
              <div class="repeat-items" style={{margin: "10px"}}>
                {this.show_trigger_btn()}
                <div class="repeat-item col-12" >
                  {
                    this.render_container()
                  }  
                </div>
              </div>
              {
                this.render_submit_button()
              }
            </div>
        </form>
      </div>

    );
    
  }
}

export default Complex;
