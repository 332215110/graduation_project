"use strict";(self["webpackChunkg_vue_project"]=self["webpackChunkg_vue_project"]||[]).push([[50],{4050:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"common-layout"},[a("el-form",{ref:"eduForm",staticClass:"demo-eduForm",attrs:{model:e.eduForm,"status-icon":"",rules:e.rules,"label-position":"top"}},[a("el-form-item",{attrs:{label:"个人简介"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10},maxlength:"1000","show-word-limit":""},model:{value:e.eduForm.self_introduction,callback:function(t){e.$set(e.eduForm,"self_introduction",t)},expression:"eduForm.self_introduction"}})],1),a("el-form-item",{attrs:{label:"研究领域"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10}},model:{value:e.eduForm.research_fields,callback:function(t){e.$set(e.eduForm,"research_fields",t)},expression:"eduForm.research_fields"}})],1),a("el-form-item",{attrs:{label:"学术兼职"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10}},model:{value:e.eduForm.academic_duties,callback:function(t){e.$set(e.eduForm,"academic_duties",t)},expression:"eduForm.academic_duties"}})],1),a("el-form-item",{attrs:{label:"获奖信息"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10}},model:{value:e.eduForm.award,callback:function(t){e.$set(e.eduForm,"award",t)},expression:"eduForm.award"}})],1),a("el-form-item",{attrs:{label:"教育信息"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:10}},model:{value:e.eduForm.education_experience,callback:function(t){e.$set(e.eduForm,"education_experience",t)},expression:"eduForm.education_experience"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitFrom(e.eduForm)}}},[e._v("提交")]),a("el-button",{on:{click:e.cancelMod}},[e._v("取消修改")])],1)],1)],1)},r=[],s=a(9881),i={data(){return{eduForm:{self_introduction:"",research_fields:"",academic_duties:"",award:"",education_experience:"",id:0},rules:{}}},created:function(){this.eduForm=JSON.parse(localStorage.getItem("user-info"))},methods:{submitFrom(e){(0,s.NM)(e).then((function(t){console.log(t),200==t.data.code?(alert(t.data.msg),localStorage.setItem("user-info",JSON.stringify(e))):(t.data.code,alert(t.data.msg))}))},cancelMod(){this.eduForm=JSON.parse(localStorage.getItem("user-info"))}}},l=i,u=a(9724),n=(0,u.Z)(l,o,r,!1,null,null,null),m=n.exports}}]);
//# sourceMappingURL=50.edfcdf53.js.map