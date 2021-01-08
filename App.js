import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import Select from "react-select";
import SubColumn from "./subcolumn";
import Category from "./category";

class App extends React.Component{
  state = {
    data:[],
    climateOptions: [],
    deptOptions: [],original:[],
    climateSelected:[],
    deptSelected:[]
  }
  componentDidMount(){
    var allRepos;
    var climate = [];
    var dept = [];
    const climateOptions = [];
    const deptOptions = [];
    const apiUrl='http://ln001xscps0001:8098/GetData'

    axios.get(apiUrl).then((repos) => {

      allRepos = repos.data;
      for (let i in allRepos) {
        climate.push(allRepos[i].climate);
        dept.push(allRepos[i].classGroup);
      }
      climate = [...new Set(climate)];
      dept = [...new Set(dept)];
      for (let i in climate) {
        const item = {
          value: climate[i],
          label: climate[i],
          category: "climate"
        };
        climateOptions.push(item);
      }
      for (let i in dept) {
        const item = {
          value: dept[i],
          label: dept[i],
          category: "classGroup"
        };
        deptOptions.push(item);
      }
      this.setState({
        data:allRepos,
        original:allRepos,
        climateOptions,
        deptOptions
      })

    }).catch(()=>console.log("error: "+apiUrl));

   
  }
  setData =(data,dept) => {
    const filterData = data.filter(obj => obj.classGroup === dept);
   // console.log(filterData.length);

    const groupData = _.chain(filterData)
      // Group the elements of Array based on `color` property
      .groupBy("climate")
      .value();
    console.log(groupData);
    const data1 = groupData["Cold/Normal"];
    const data2 = groupData["WARM/HOT"];
    const data3 = groupData["TROPICAL"];
    const all = [];
    for (let i = 0; i < 17; i++) {
      const obj = {
        id: i + 1,
        climate: "ALL CLIMATE",
        classGroup: dept,
        seq: i + 1,
        fields: data1[i].fields,
        bos_PLN: data1[i].bos_PLN + data2[i].bos_PLN + data3[i].bos_PLN,
        bos_LY: data1[i].bos_LY + data2[i].bos_LY + data3[i].bos_LY,
        bos_LY_COMP:
          data1[i].bos_LY_COMP + data2[i].bos_LY_COMP + data3[i].bos_LY_COMP,
        aug_PLN: data1[i].aug_PLN + data2[i].aug_PLN + data3[i].aug_PLN,
        aug_LY: data1[i].aug_LY + data2[i].aug_LY + data3[i].aug_LY,
        aug_LY_COMP:
          data1[i].aug_LY_COMP + data2[i].aug_LY_COMP + data3[i].aug_LY_COMP,
        sept_PLN: data1[i].sept_PLN + data2[i].sept_PLN + data3[i].sept_PLN,
        sept_LY: data1[i].sept_LY + data2[i].sept_LY + data3[i].sept_LY,
        sept_LY_COMP:
          data1[i].sept_LY_COMP + data2[i].sept_LY_COMP + data3[i].sept_LY_COMP,
        oct_PLN: data1[i].oct_PLN + data2[i].oct_PLN + data3[i].oct_PLN,
        oct_LY: data1[i].oct_LY + data2[i].oct_LY + data3[i].oct_LY,
        oct_LY_COMP:
          data1[i].oct_LY_COMP + data2[i].oct_LY_COMP + data3[i].oct_LY_COMP,
        nov_PLN: data1[i].nov_PLN + data2[i].nov_PLN + data3[i].nov_PLN,
        nov_LY: data1[i].nov_LY + data2[i].nov_LY + data3[i].nov_LY,
        nov_LY_COMP:
          data1[i].nov_LY_COMP + data2[i].nov_LY_COMP + data3[i].nov_LY_COMP,
        dec_PLN: data1[i].dec_PLN + data2[i].dec_PLN + data3[i].dec_PLN,
        dec_LY: data1[i].dec_LY + data2[i].dec_LY + data3[i].dec_LY,
        dec_LY_COMP:
          data1[i].dec_LY_COMP + data2[i].dec_LY_COMP + data3[i].dec_LY_COMP,
        jan_PLN: data1[i].jan_PLN + data2[i].jan_PLN + data3[i].jan_PLN,
        jan_LY: data1[i].jan_LY + data2[i].jan_LY + data3[i].jan_LY,
        jan_LY_COMP:
          data1[i].jan_LY_COMP + data2[i].jan_LY_COMP + data3[i].jan_LY_COMP,
        q3_PLN: data1[i].q3_PLN + data2[i].q3_PLN + data3[i].q3_PLN,
        q3_LY: data1[i].q3_LY + data2[i].q3_LY + data3[i].q3_LY,
        q3_LY_COMP:
          data1[i].q3_LY_COMP + data2[i].q3_LY_COMP + data3[i].q3_LY_COMP,
        q4_PLN: data1[i].q4_PLN + data2[i].q4_PLN + data3[i].q4_PLN,
        q4_LY: data1[i].q4_LY + data2[i].q4_LY + data3[i].q4_LY,
        q4_LY_COMP:
          data1[i].q4_LY_COMP + data2[i].q4_LY_COMP + data3[i].q4_LY_COMP,
        fall_PLN: data1[i].fall_PLN + data2[i].fall_PLN + data3[i].fall_PLN,
        fall_LY: data1[i].fall_LY + data2[i].fall_LY + data3[i].fall_LY,
        fall_LY_COMP:
          data1[i].fall_LY_COMP + data2[i].fall_LY_COMP + data3[i].fall_LY_COMP
      };
      all.push(obj);
    }
    return all;
  }
 
  handleChange = (e,option) => {
    if(e==null) return;
    if(e[0]==undefined){
      if(option === 'climate'){
        this.setState({
          climateSelected:[]
        })
      }
     else if(option === 'classGroup'){
        this.setState({
          deptSelected:[]
        })
      }
      return;
    }
    if(e!=null ){
    
    var climateSelected=[], deptSelected=[];
    
    if(e[0].category === 'climate'){
      if(e[e.length-1].value==='ALL CLIMATE'){
        climateSelected.push('ALL CLIMATE');
        console.log('Inside if...');
        console.log(climateSelected);
      }
      else{
      for(let item of e){
        climateSelected.push(item.value);
      }
    }
      this.setState({
        climateSelected
      })
    }
    else if(e[0].category === 'classGroup'){
     
      for(let item of e){
        deptSelected.push(item.value);
      }
      this.setState({
        deptSelected
      })
    }
  }
   
  };
  inStruct = (val,structure) =>{
    if(structure.length===0){
      return true;
    }
    for(let a in structure)
    {
      if(structure[a] === val)
        {
          return true;
        }
    }
  return false;
  }
  render(){
    const {data,climateSelected,deptSelected} = this.state;
    var filterData;
    console.log('inside render');
    console.log(climateSelected[0])
    if(climateSelected.length === 0 && deptSelected.length===0){
      filterData=data;
    }
  
    else if(climateSelected[0]==='ALL CLIMATE'){
      const dept = deptSelected[deptSelected.length-1] ? deptSelected[deptSelected.length-1] :'TOTAL DEPT';
      console.log(dept)
      filterData = this.setData(data,dept);

    }
    else{
    filterData = data.filter(obj => {
      if(this.inStruct(obj.climate,climateSelected) && this.inStruct(obj.classGroup,deptSelected)){
        return obj;
     }
    
    })
  }
    return (
      <div>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">
              Climate
              <Select
                isMulti
                name="climate"
                options={[...this.state.climateOptions,{
                  value: 'ALL CLIMATE',
                  label: 'ALL CLIMATE',
                  category: "climate"
                }]}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={e => this.handleChange(e,'climate')}
              />
            </th>
            <th rowSpan="3">
              DeptClass
              <Select
                isMulti
                name="department"
                options={this.state.deptOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={e => this.handleChange(e,'classGroup')}
              />
            </th>
            <th rowSpan="3" />
            <th colSpan="3" scope="colgroup">
              BOS
            </th>
            <th colSpan="3" scope="colgroup">
              AUG
            </th>
            <th colSpan="3" scope="colgroup">
              SEPT
            </th>
            <th colSpan="3" scope="colgroup">
              OCT
            </th>
            <th colSpan="3" scope="colgroup">
              NOV
            </th>
            <th colSpan="3" scope="colgroup">
              DEC
            </th>
            <th colSpan="3" scope="colgroup">
              JAN
            </th>
            <th colSpan="3" scope="colgroup">
              Q3
            </th>
            <th colSpan="3" scope="colgroup">
              Q4
            </th>
            <th colSpan="3" scope="colgroup">
              FALL
            </th>
          </tr>
          <SubColumn />
        </thead>
        <tbody>
          {filterData.map(obj => {
            return (
              <tr key={obj.id}>
                <td>{obj.climate}</td>
                <td>{obj.classGroup}</td>
                <td>{obj.fields}</td>
                <Category obj={obj} type="bos" />
                <Category obj={obj} type="aug" />
                <Category obj={obj} type="sept" />
                <Category obj={obj} type="oct" />
                <Category obj={obj} type="nov" />
                <Category obj={obj} type="dec" />
                <Category obj={obj} type="jan" />
                <Category obj={obj} type="q3" />
                <Category obj={obj} type="q4" />
                <Category obj={obj} type="fall" />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
  }
}

export default App;
