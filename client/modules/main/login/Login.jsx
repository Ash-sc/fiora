import React, { Component } from 'react';
import platform from 'platform';
import md5 from 'md5';

import socket from '@/socket';
import action from '@/state/action';
import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import Input from '@/components/Input';
import Message from '@/components/Message';
import './Login.less';

class Login extends Component {
    handleLogin = () => {
        const username = this.loginUsername.getValue().trim();
        const password = this.loginPassword.getValue().trim();
        if (!username || !password) return Message.error('用户名/密码不能为空');
        socket.emit('login', {
            username,
            password: md5(password),
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                action.setUser(res);
                action.closeLoginDialog();
                window.localStorage.setItem('token', res.token);
            }
        });
    }
    handleRegister = () => {
        const username = this.registerUsername.getValue().trim();
        const password = this.registerPassword.getValue().trim();
        if (!username || !password) return Message.error('用户名/密码不能为空');
        socket.emit('register', {
            username,
            password: md5(password),
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                Message.success('创建成功');
                action.setUser(res);
                action.closeLoginDialog();
                window.localStorage.setItem('token', res.token);
            }
        });
    }
    renderLogin() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={i => this.loginUsername = i} />
                <h3>密码</h3>
                <Input type="password" ref={i => this.loginPassword = i} onEnter={this.handleLogin} />
                <button onClick={this.handleLogin}>登录</button>
            </div>
        );
    }
    renderRegister() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={i => this.registerUsername = i} placeholder="用户名不可修改, 可为数字、中英文, 最长20字节" />
                <h3>密码</h3>
                <Input type="password" ref={i => this.registerPassword = i} onEnter={this.handleRegister} placeholder="暂时也不支持修改" />
                <button onClick={this.handleRegister}>注册</button>
            </div>
        );
    }
    render() {
        return (
            <Tabs
                className="main-login"
                defaultActiveKey="login"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="登录" key="login">
                    {this.renderLogin()}
                </TabPane>
                <TabPane tab="注册" key="register">
                    {this.renderRegister()}
                </TabPane>
            </Tabs>
        );
    }
}

export default Login;
