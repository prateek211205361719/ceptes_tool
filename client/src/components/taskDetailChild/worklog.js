import React,{Component} from'react';
class Basic6 extends Component{
    constructor(){
        super();
        this.state={
            name:["AbD", " ", "Dravid", " " ,"Gayle"]
        }
    }
    render(){
        return(
            <div>
               {this.state.name}
            </div>
        );
    }
}
export default Basic6; 