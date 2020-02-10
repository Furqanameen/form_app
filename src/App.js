import React from 'react';
import './assets/App.css';
// import './basscss.css';
import './assets/basscss.css'
// import './basscss.css';
import './assets/style.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      playText: "Play",
      playIcon: true,
      container_array:  [
                          {
                            id:1,
                            status: "CM",
                            first_row: {fi: "a",se: 'b',th: "c"},
                            second_row:[],
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
    temp_array.push({id: this.state.container_array.length+1,status: "CM",first_row: {},second_row:[],rule_name:''})
    this.setState({container_array: temp_array})
  }

  remove_row_press = (row_id,container_id) =>{
    console.log(row_id)
    console.log(container_id)
    var temp_array = this.state.container_array
    temp_array[container_id-1].second_row = temp_array[container_id-1].second_row.filter(function(row) { 
                                              return row.id !== row_id 
                                            });
    this.setState({container_array: temp_array})
  }

  add_row_press = (container_id) =>{
    console.log(container_id)
    if (container_id){
      var temp_array = this.state.container_array
      console.log(temp_array[container_id-1])
      var id = temp_array[container_id-1].second_row.length+1
      temp_array[container_id-1].second_row.push({id: id,sfi:"",sse: ""})
      this.setState({container_array: temp_array})
    }
  }

  press_blue_btn = (container_id,status) =>{
    var temp_array = this.state.container_array
    if (status === "CM"){
      temp_array[container_id-1].status = "AND"
    }else if (status === "AND"){
      temp_array[container_id-1].status = "OR"
    }else{
      temp_array[container_id-1].status = "AND"
    }
    this.setState({container_array: temp_array})
    
  }

  render_second_row = (second_row,container_id) =>{
    if (second_row){
      if (second_row.length > 0){
        return(
          second_row.map((data) =>{
            return(
              <div class="repeat-item flex items-center">
                <div class="col-3">
                  <select class="repeat-el col-12 no-right-border" >
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

                <div class="col-3">
                  <select
                    class="repeat-el no-right-border col-12" >
                    <option value="" disabled selected>Lookback Window</option>
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

                <div class="col-2" style={{"margin":"1px"}}>
                  <select class="repeat-el no-side-borders col-12"
                  >
                    <option value="" disabled selected>Operator</option>
                    <option value="<"> {"<"} </option>
                    <option value="<=">{"<="}</option>
                    <option value=">">{">"}</option>
                    <option value=">=">{">="}</option>
                    <option value="=">{"="}</option>
                  </select>
                </div>

                <div class="col-2">
                  <input
                    class="col-12 repeat-el "
                    type="text"
                    size="10"
                    maxlength="256"
                    style={{"font-size": "12pt"}}
                  />
                </div>
                <div class="col-1">
                  <i style={{"marginLeft":"5px"}} className="fa fa-minus-circle" onClick={(e) => this.remove_row_press(data.id,container_id)}></i>
                </div>
              </div>
            )        
          })
        )
      }
    }
  }

  render_container = () =>{
    return(
      this.state.container_array.map((data)  => {
        return(
          <div  style={{display: "flex","padding-top": "40px"}}>
            <div style={{display: "flex",width: "1.5%",background:"#1b95e0","margin-right": "6px",flexDirection: "column"}}>
              <div style={{display:"flex",height: "70%",alignItems:'flex-end',justifyContent: 'center'}}>
                <h6 style={{color: "white",transform: "rotate(270deg)"}} onClick={(e) => this.press_blue_btn(data.id,data.status)}>{data.status}</h6>
              </div>
              <div style={{display:"flex",height: "30%",alignItems:'flex-end',justifyContent: 'center'}}>
                <i className="fa fa-plus-circle" style={{color: "white"}} onClick={(e) => this.add_row_press(data.id)}></i>
              </div>
            </div>
            <div style={{flex:0.9}}>
              <div class="fixed-item flex items-center">
                <div class="col-4" style={{"margin":"0px"}}>
                  <select class="repeat-el col-12 no-right-border" style={{background:"white"}}>
                    <option value="Campaign Name" selected>Campaign Name</option>
                    <option value="Ad Set Name">Ad Set Name</option>
                    <option value="Ad Name">Ad Name</option>
                  </select>
                </div>
                <div class="col-3" style={{"margin":"1px"}}>
                  <select class="repeat-el no-side-borders col-12"
                  >
                    <option value="" disabled selected>Operator</option>
                    <option value="equals">Equals</option>
                    <option value="contains">Contains</option>
                    <option value="does not contain">Does not contain</option>
                  </select>
                </div>
                <div class="col-4" style={{"margin":"0px"}}>
                  <input
                    class="col-12 repeat-el "
                    type="text"
                    size="10"
                    maxlength="256"
                    style={{"font-size": "12pt"}}
                  />
                </div>
                <div class="col4"></div>
              </div>
            
              <div class="repeat-item flex items-center">
                <div class="col-4" style={{"margin":"0px"}}>
                  <select class="repeat-el col-12 no-right-border" >
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

                <div class="col-3" style={{"margin":"1px"}}>
                  <select
                    class="repeat-el no-right-border col-12" >
                    <option value="" disabled selected>Lookback Window</option>
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

                <div class="col-2" style={{"margin":"0px"}}>
                  <select class="repeat-el no-side-borders col-12"
                  >
                    <option value="" disabled selected>Operator</option>
                    <option value="<"> {"<"} </option>
                    <option value="<=">{"<="}</option>
                    <option value=">">{">"}</option>
                    <option value=">=">{">="}</option>
                    <option value="=">{"="}</option>
                  </select>
                </div>

                <div class="col-2" style={{"margin":"1px"}}>
                  <input
                    class="col-12 repeat-el "
                    type="text"
                    size="10"
                    maxlength="256"
                    style={{"font-size": "12pt"}}
                  />
                </div>
              </div>
              <div>
                <div class="col-4" style={{"margin":"1px"}}>
                  <input
                    placeholder="Rule Name"
                    class="col-12 repeat-el "
                    type="text"
                    size="10"
                    maxlength="256"
                    style={{"font-size": "12pt"}}
                  />
                </div>
              </div>
              {
                this.render_second_row(data.second_row,data.id)
              }
            </div>
          </div>

        )
      })
    )
  }

  render(){
    return (
      <div id="page" style={{"max-width": "900px;"}}>
        <h1>Marketing Rules</h1>
        <br />
        <div class="col-3" style={{"padding-left":"20px"}}>
          <select class="repeat-el col-12 no-right-border" >
            <option value="Facebook Ads" selected>Facebook Ads</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Google Analysis">Google Analysis</option>
          </select>
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
              <div class="repeat-items">
                <div class="repeat-item col-12" >
                  <div id="base_condition_group_1" class="repeat-section flex items-center" >
                    <div class="repeat-items flex-auto">
                      <div style={{"text-align": 'right',"marginBottom": "20px","padding-right": "30%"}} onClick={this.trigger_press}>Trigger/Action</div>
                      {
                        this.render_container()
                      }  
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" class="col-2" value="save" id="submit_button" />
            </div>
        </form>
      </div>

    );
    
  }
}

export default App;
