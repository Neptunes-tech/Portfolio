import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login, Signup, ForgotPassword, UpdatePassword, VerifyEmail, AdminLogin, AdminSegments, AdminCards, Users, PriceSettings, Guests, Messages, Subscription, Invoices, UserInvoices, SendMessagesList, Settings, Home, UserCards, UserSegments, MessageReport, FinancialReport, StockReport, InviteGuest, Savings, Advertisement, BuUsers, Questions, Form, Coupons, Group, Ads, PostalCards, Notification, LoyaltyCards, Cashback, Lottery, AdminLottery, AdminCashback, AdminGroup, QuestionFormReport, AdminGiftCards, GiftCards, GuestGiftCards, ProvisionReport } from '../Screens'
import { MenuLayout, AdminLayout } from '../Components'
import allPaths from './paths'
import { Result, Button } from 'antd'
import { AdminForm, AdminQuestions } from '../Screens/Admin'

const Page404 = (props) => {
    const { history } = props
    return (
        <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={<Button
                type='primary'
                className='form-button'
                onClick={() => history.push('/')}
            >Back Home</Button>}
        />
    )
}

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path={allPaths?.LOGIN} exact component={Login} />
                <Route path={allPaths?.SIGNUP} exact component={Signup} />
                <Route path={allPaths?.BU_LOGIN} exact component={Login} />
                <Route path={allPaths?.BU_SIGNUP} exact component={Signup} />
                <Route path={allPaths?.FORGOT} exact component={ForgotPassword} />
                <Route path={allPaths?.BU_FORGOT} exact component={ForgotPassword} />
                <MenuLayout path={allPaths?.QUESTIONS} exact component={Questions} />
                <MenuLayout path={allPaths?.COUPON} exact component={Coupons} />
                <MenuLayout path={allPaths?.HOME} exact component={Home} />
                <MenuLayout path={allPaths?.GUEST} exact component={Guests} />
                {/* <MenuLayout path={allPaths?.MESSAGES} exact component={Messages} /> */}
                <MenuLayout path={allPaths?.CASHBACK} exact component={Cashback} />
                <MenuLayout path={allPaths?.SAVINGS} exact component={Savings} />
                <MenuLayout path={allPaths?.NOTIFICATION} exact component={Notification} />
                <MenuLayout path={allPaths?.ADVERTISMENT} exact component={Advertisement} />
                <MenuLayout path={allPaths?.SUBSCRIPTION} exact component={Subscription} />
                <MenuLayout path={allPaths?.INVOIICES} exact component={Invoices} />
                <MenuLayout path={allPaths?.PROFILE_SETTINGS} exact component={Settings} />
                <MenuLayout path={allPaths?.CARDS} exact component={UserCards} />
                {/* <MenuLayout path={allPaths?.SEGMENTS} exact component={UserSegments} /> */}
                <MenuLayout path={allPaths?.BU_USERS} exact component={BuUsers} />
                <MenuLayout path={allPaths?.LOTTERY} exact component={Lottery} />
                <MenuLayout path={allPaths?.GROUP} exact component={Group} />

                <MenuLayout path={allPaths?.GIFT_CARDS} exact component={GiftCards} />
                <MenuLayout path={allPaths?.GIFT_CARD} exact component={GuestGiftCards} />

                <Route path={`${allPaths?.UPDATE_PASSWORD}/:token`} exact component={UpdatePassword} />
                <Route path={`${allPaths?.BU_UPDATE_PASSWORD}/:token`} exact component={UpdatePassword} />
                <Route path={`${allPaths?.VERIFY_EMAIL}/:token`} exact component={VerifyEmail} />
                <Route path={`${allPaths?.INVITE_GUEST}/:token`} exact component={InviteGuest} />
                <Route path={`${allPaths?.FORM}/:token`} exact component={Form} />

                {/* Admin */}

                <Route path={allPaths?.ADMIN_LOGIN} exact component={AdminLogin} />
                <AdminLayout path={allPaths?.ADMIN_SEGMENTS} exact component={AdminSegments} />
                <AdminLayout path={allPaths?.ADMIN_QUESTION} exact component={AdminQuestions} />
                <AdminLayout path={allPaths?.ADMIN_CARDS} exact component={AdminCards} />
                <AdminLayout path={allPaths?.USERS} exact component={Users} />
                <AdminLayout path={allPaths?.ADMIN_PRICE_SETTINGS} exact component={PriceSettings} />
                <AdminLayout path={allPaths?.USER_INVOICES} exact component={UserInvoices} />
                <AdminLayout path={allPaths?.MESSAGES_LIST} exact component={SendMessagesList} />
                <AdminLayout path={allPaths?.MESSAGE_REPORT} exact component={MessageReport} />
                <AdminLayout path={allPaths?.FINANCIAL_REPORT} exact component={FinancialReport} />
                <AdminLayout path={allPaths?.PROVISION_REPORTS} exact component={ProvisionReport} />
                <AdminLayout path={allPaths?.QUESTION_FORM_REPORT} exact component={QuestionFormReport} />
                <AdminLayout path={allPaths?.STOCK_REPORT} exact component={StockReport} />
                <AdminLayout path={allPaths?.ADMIN_ADVERTISEMENT} exact component={Ads} />
                <AdminLayout path={allPaths?.POSTAL_CARDS} exact component={PostalCards} />
                <AdminLayout path={allPaths?.LOYALTY_CARDS} exact component={LoyaltyCards} />
                <AdminLayout path={allPaths?.ADMIN_LOTTERY} exact component={AdminLottery} />
                <AdminLayout path={allPaths?.ADMIN_GIFT_CARDS} exact component={AdminGiftCards} />
                <AdminLayout path={allPaths?.ADMIN_CASHBACK} exact component={AdminCashback} />
                <AdminLayout path={allPaths?.ADMIN_GROUP} exact component={AdminGroup} />
                <Route path={`${allPaths?.ADMIN_FORM}/:token`} exact component={AdminForm} />

                <Route path='/:page404' exact component={Page404} />
                <Route path={`/:page404/:token`} exact component={Page404} />
                <Route path='admin/:page404' exact component={Page404} />
            </Switch>
        </Router>
    )
}

export {
    Routes,
    Page404
}