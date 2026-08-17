//这个对象是最终的熟对象，需要让每种基座知道自己的角色，数据应当编写的是更之前的催化剂，它会自动计算出每种基座应当经过哪些检验
var CatalystPatterns = {
    Abed: {
        aq:{
            appendix:{type:"Abed", rel_pos:{q:0, r:0}},
            reactant:{type:"Qbed", rel_pos:{q:-1,r:1}},
            product :{type:"Qbed", rel_pos:{q:1, r:1}},
        },
        qi:{
            appendix:{type:"Abed", rel_pos:{q:0, r:0}},
            reactant:{type:"Qbed", rel_pos:{q:0,r:-1}},
            product :{type:"Qbed", rel_pos:{q:2,r:-1}},
        },
    }
}