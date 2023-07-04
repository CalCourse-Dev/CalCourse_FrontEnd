import * as React from 'react';
import { Component } from 'react';
 
class About extends Component {
    state = { }
    render() { 
        return (  
            <div>
                <p className="about-title">
                <strong>Made with 💙💛💙 by ... </strong><br />
            </p>
            <p>
                <strong>Prototype</strong><br />
                -T.K.-
            </p>
            <p>
                <strong>Front End | 前端</strong><br />
                Ruohan Yan, Yuanhan Li, Ruomu Xu, Charlie Cheng-Jie Ji
            </p>
            <p>
                <strong>Full Stack & Maintenance | 全栈 & 技术维护</strong><br />
                Huanzhi Mao
            </p>
            <p>
                <strong>Special Thanks | 特别鸣谢</strong><br />
                Shufan Li, Uncertainty. CC
            </p>
            <p>
                <strong>Contact Us | 联系我们</strong><br />
                <a href="mailto:huanzhimao@berkeley.edu">huanzhimao@berkeley.edu</a>
            </p>
            </div>
        );
    }
}
 
export default About;