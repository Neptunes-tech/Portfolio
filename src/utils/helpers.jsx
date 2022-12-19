import { message, notification } from 'antd'
import axios from 'axios'
import momentTz from 'moment-timezone'
import PDFDocument from '@react-pdf/pdfkit'
import blobStream from 'blob-stream'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser'
import QRCode from 'qrcode'
import allPaths from '../Config/paths'
import chunk from 'lodash/chunk'
import { AUTH, GET, ADMIN } from './apis'

const requiredMessage = (value) => `Please input your ${value}!`

const inputPlace = (value) => `Input your ${value} Here...!`

const datePlace = (value) => `Input number of days to send (${value}) Here...!`

const setActiveMenu = (path) => path === allPaths.HOME ? 0 : path === allPaths.GUEST ? 1 : path === allPaths.SUBSCRIPTION ? 2 : path === allPaths.BU_USERS ? 3 : path === allPaths.INVOIICES ? 4 : path === allPaths.QUESTIONS ? 5 : path === allPaths.ADVERTISMENT ? 6 : path === allPaths.COUPON ? 7 : path === allPaths.SAVINGS ? 8 : path === allPaths.NOTIFICATION ? 9 : path === allPaths.LOTTERY ? 10 : path === allPaths.CASHBACK ? 11 : (path === allPaths.GIFT_CARDS || path === allPaths.GIFT_CARD) ? 16 : 12

const setActiveAdminMenu = (path) => path === allPaths.ADMIN_SEGMENTS ? 0 : path === allPaths.ADMIN_CARDS ? 1 : path === allPaths.USERS ? 2 : path === allPaths.USER_INVOICES ? 3 : path === allPaths.ADMIN_PRICE_SETTINGS ? 4 : path === allPaths.MESSAGES_LIST ? 5 : path === allPaths.REPORT ? 6 : path === allPaths.ADMIN_ADVERTISEMENT ? 7 : path === allPaths.POSTAL_CARDS ? 8 : path === allPaths.LOYALTY_CARDS ? 9 : path === allPaths.ADMIN_LOTTERY ? 10 : path === allPaths.ADMIN_CASHBACK ? 11 : 12

const successMessage = (desc = 'Successfully Complete!') => {
    return message.success(desc)
}

const infoMessage = (desc = 'Successfully Complete!') => {
    return message.info(desc)
}

const errorMessage = (desc = 'Oops Something Went Wrong!') => {
    return message.error(desc)
}

const warningMessage = (desc = 'Warning!') => {
    return message.warning(desc)
}

const successNotification = (message = 'Successfully Complete!') => {
    return notification.success({ message })
}

const errorNotification = (message = 'Oops Something Went Wrong!') => {
    return notification.error({ message })
}

const userObject = (result) => {
    const { profileObj } = result
    return {
        email: profileObj.email,
        fullName: `${profileObj.givenName} ${profileObj.familyName}`,
        uid: profileObj.googleId
    }
}

const facebookLogin = (result, history, loginUser) => {
    const obj = {
        email: result?.email,
        uid: result.id,
        fullName: result.name,
    }
    axios.post(AUTH.SOCIAL_LOGIN, obj)
        .then((res) => {
            const { data } = res
            if (data.success) {
                loginUser(data.user)
                successMessage('Successfully Logged In!')
                return setTimeout(() => {
                    history.push('/')
                }, 300)
            }
            errorMessage(data.message)
        })
        .catch((e) => {
            errorMessage()
        })
}

const googleLogin = (result, history, loginUser) => {
    const obj = userObject(result)
    axios.post(AUTH.SOCIAL_LOGIN, obj)
        .then((res) => {
            const { data } = res
            if (data.success) {
                loginUser(data.user)
                successMessage('Successfully Logged In!')
                return setTimeout(() => {
                    history.push('/')
                }, 300)
            }
            errorMessage(data.message)
        })
        .catch((e) => {
            errorMessage()
        })
}

const convertTitle = (val) => val.charAt(0).toUpperCase() + val.slice(1)

const convertDate = (m) => momentTz(m)?.format('DD-MM-YYYY')

const getAllData = async (userId, adminActions) => {
    let date1 = momentTz().format('YYYY-MM-DD')
    let date2 = momentTz().add(7, 'days').format('YYYY-MM-DD')

    let obj = {
        date1,
        date2
    }

    axios.get(`${GET.ALL_USERS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllUsers(data?.data || [])
        })

    axios.get(`${GET.ALL_BUSINESS_USERS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllBusinessUsers(data?.data || [])
        })

    axios.get(`${ADMIN.GET_SEGMENTS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllSegments(data?.data || [])
        })

    axios.get(`${ADMIN.GET_CARDS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllCards(data?.data || [])
        })

    axios.get(`${ADMIN.GET_GROUPS}/61b10b9d5efe4d4b7cc63451`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllGroups(data?.data || [])
        })

    axios.get(`${ADMIN.GET_ALL_CARDS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllPublicCards(data?.data || [])
        })

    axios.get(`${ADMIN.GET_USERS_INVOICES}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllUsersInvoices(data?.data || [])
        })

    axios.post(`${ADMIN.GET_MESSAGES_REPORTS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllReports(data?.data || [])
        })

    axios.post(`${ADMIN.GET_MESSAGES_LIST}`, obj)
        .then((res) => {
            const { data } = res
            adminActions?.addAllMessagesList(data?.data || [])
        })

    axios.post(`${ADMIN.GET_POSTAL_CARDS}`, obj)
        .then((res) => {
            const { data } = res
            adminActions?.addAllPostalCardsList(data?.data || [])
        })

    axios.post(`${ADMIN.GET_FINANCIAL_REPORTS}/${userId}`, obj)
        .then((res) => {
            const { data } = res
            adminActions?.addAllFinancialReports(data?.data || [])
        })
    axios.get(`${ADMIN?.GET_PROVISION_REPORTS}/${userId}`)
        .then((res) => {
            const { data } = res
            console.log('data', data.data)
            adminActions?.addAllProvisionReport(data?.data || [])
        })

    axios.post(`${ADMIN.GET_STOCK_REPORTS}/${userId}`, obj)
        .then((res) => {
            const { data } = res
            adminActions?.addAllStockReports(data?.data || [])
        })
}

const getAllUserData = async (userId, userActions) => {

    axios.get(`${GET.GUESTS}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions?.addAllGuests(data?.data || [])
        })

    axios.get(`${GET.SEGMENT_MESSAGES_BY_ID}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions?.addAllSegmentMessage(data?.data || [])
        })

    axios.get(`${GET.ACTIVE_SUBSCRIPTION}`)
        .then((res) => {
            const { data } = res
            userActions?.addAllSubscriptions(data?.data || [])
        })

    axios.get(`${GET.POSTAL_CARD}`)
        .then((res) => {
            const { data } = res
            userActions?.addPostalCardPrice(data?.data || {})
        })

    axios.get(`${GET.INVOICES}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions?.addAllInvoices(data?.data || {})
        })

    axios.get(`${GET.SEGMENTS_BY_ID}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions?.addAllUserSegments(data?.data || {})
        })

    axios.get(`${GET.ALL_COUPONS_DETAIL}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllCouponsSubscriptionDetail(data?.data || {})
        })

    axios.get(`${GET.SAVINGS}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllSavings(data?.data || {})
        })

    axios.get(`${GET.ALL_QUESTIONS_FORM}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllForms(data?.data || [])
        })

    axios.get(`${GET.FORM_REPORTS}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllFormReports(data?.data || [])
        })

    axios.get(`${GET.COUPONS_DETAIL}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllCoupons(data?.data || [])
        })
    axios.get(`${GET.USER_JOINED_GROUPS}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addUserJoinedGroups(data?.data || [])
        })

    axios.get(`${GET.USER_PENDING_GROUPS}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addUserPendingGroups(data?.data || [])
        })

    axios.get(`${GET.GET_NOTIFICATION}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addNotifictaion(data?.data || [])
        })

    axios.get(`${GET.CARDS_BY_ID}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllCard(data?.data || [])
        })
    axios.get(`${GET?.ADVERTISEMENT}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addAllAdvertisement(data?.data || [])
        })
    axios.get(`${GET?.GET_USER_WALLET}/${userId}`)
        .then((res) => {
            const { data } = res
            userActions.addWallet(data?.data || [])
        })
}


const getAllSegments = async (adminActions, userId) => {

    axios.get(`${GET.ALL_SEGMENTS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllSegments(data?.data || [])
        })

    axios.get(`${GET.ALL_CARDS}/${userId}`)
        .then((res) => {
            const { data } = res
            adminActions?.addAllCards(data?.data || [])
        })
}


const convertNumber = (num) => `${parseFloat(num)?.toFixed(2)}`
const convertNumberCardCoupon = (num) => {
    return `${parseFloat(num).toFixed(2)}`
}
const convertFloat = (num) => parseFloat(num)?.toFixed(2)

const dateFormater = (d) => momentTz(d).format('ddd MMM DD YYYY')

const splitDate = (date) => date?.split('T')[0]

const convertMessage = (msg, guest, user) => {
    let message = draftToHtml(msg)

    if (guest && user) {
        message = message?.replace(/@guestName/gi, guest?.name)
        message = message?.replace(/@name/gi, user?.fullName)
        message = message?.replace(/@guestEmail/gi, guest?.email)
        message = message?.replace(/@email/gi, user?.email)
        message = message?.replace(/@businessName/gi, guest?.businessName)
    }

    return ReactHtmlParser(message) || 'Not Found'
}

const createInvoicePdf = async (invoice, user, action, viewInvoice) => {
    // console.log('create Invoice Pdf function is working')
    const doc = new PDFDocument()

    console.log('**invoice', invoice)

    const stream = doc.pipe(blobStream())

    let iconUrl = 'https://res.cloudinary.com/dklfq58uq/image/upload/v1641853789/invoice-icon_czczkc.jpg'

    let imageBase64 = await toBase64(iconUrl)

    doc.image(imageBase64, 410, 10, { width: 150, height: 130 })

    if (user?.businessName) {
        doc.font('Helvetica-Bold').fontSize(10).text(user?.businessName, 60, 100)
    }
    doc.text(user?.fullName, 60, 120)
    doc.text(user?.streetNumber, 60, 140)
    doc.text(user?.postalCodeCity, 60, 160)
    doc.text(user?.country, 60, 180)

    doc.fontSize(14).text(`Invoice Number: ${invoice?.invoiceNumber}`, 60, 220)

    // doc.text(`${user?.postalCodeCity}, ${dateFormater(invoice?.created)}`, 60, 240)
    doc.text(`Voorschoten, ${dateFormater(invoice?.created)}`, 60, 240)

    doc.font('Helvetica').fontSize(10).text('______________________________________________________________________________________', 60, 250)

    let x = 280
    let leftVal = 360
    let rightVal = 515

    // console.log('invoice subscription Name', invoice?.subscriptionName, 'amount', invoice?.subscriptionAmount)
    if (invoice?.subscriptionAmount) {
        doc.text(`Subscription A: ${invoice?.subscriptionName?.slice(0, 50)}`, 60, x)

        let price = convertNumber(invoice?.subscriptionAmount)

        // doc.text(`Price`, leftVal, x)
        doc.text(`€ ${price}`, rightVal - (price?.length * 5), x)

        x = x + 20

        doc.text(invoice?.subscriptionName?.slice(51), 60, x)

        x = x + 20
    }

    if (invoice?.postalCardQuantity) {
        let postalCard = convertNumber(invoice?.postalCardQuantity * invoice?.postalCardRate)
        doc.text(`Postal cards (Weekly)      € ${convertNumber(invoice?.postalCardRate)} / piece`, 60, x)

        doc.text(`${invoice?.postalCardQuantity} cards x € ${convertNumber(invoice?.postalCardRate)}`, leftVal, x)

        doc.text(`€ ${postalCard}`, rightVal - (postalCard?.length * 5), x)
        x = x + 20
    }

    if (invoice?.fixedCardQuantity) {
        let fixedCard = convertNumber(invoice?.fixedCardQuantity * invoice?.fixedCardRate)
        doc.text(`Postal cards (Fixed Day)  € ${convertNumber(invoice?.fixedCardRate)} / piece`, 60, x)

        doc.text(`${invoice?.fixedCardQuantity} cards x € ${convertNumber(invoice?.fixedCardRate)}`, leftVal, x)

        doc.text(`€ ${fixedCard}`, rightVal - (fixedCard?.length * 5), x)
        x = x + 20
    }

    if (invoice?.whatsappQuantity) {
        let whatsapp = convertNumber(invoice?.whatsappQuantity * invoice?.whatsappRate)
        doc.text(`Whatsapp                         € ${convertNumber(invoice?.whatsappRate)} / message`, 60, x)

        doc.text(`${invoice?.whatsappQuantity} messages x € ${convertNumber(invoice?.whatsappRate)}`, leftVal, x)

        doc.text(`€ ${whatsapp}`, rightVal - (whatsapp?.length * 5), x)
        x = x + 20
    }

    if (invoice?.couponsQuantity) {
        let coupons = convertNumber(invoice?.couponsQuantity * invoice?.couponRate)
        doc.text(`Loyalty Coupons               € ${convertNumber(invoice?.couponRate)} / piece`, 60, x)

        doc.text(`${invoice?.couponsQuantity} cards x € ${convertNumber(invoice?.couponRate)}`, leftVal, x)

        doc.text(`€ ${coupons}`, rightVal - (coupons?.length * 5), x)
        x = x + 20
    }


    if (invoice?.couponsCardQuantity) {
        let couponsCard = convertNumberCardCoupon(invoice?.couponsCardQuantity * invoice?.couponCardRate)

        doc.text(`Loyalty Coupons Card      € ${convertNumberCardCoupon(invoice?.couponCardRate)} / piece`, 60, x)
        // console.log('invoice?.couponCardRate', invoice?.couponCardRate)
        doc.text(`${invoice?.couponsCardQuantity} cards x € ${convertNumberCardCoupon(invoice?.couponCardRate)}`, leftVal, x)

        doc.text(`€ ${couponsCard}`, rightVal - (couponsCard?.length * 5), x)

        x = x + 20

    }

    if (invoice?.lotteryQuantity) {
        let lottery = convertNumber(invoice?.lotteryQuantity * invoice?.lotteryRate)
        doc.text(`Lottery               € ${convertNumber(invoice?.lotteryRate)} / piece`, 60, x)

        doc.text(`${invoice?.lotteryQuantity} cards x € ${convertNumber(invoice?.lotteryRate)}`, leftVal, x)

        doc.text(`€ ${lottery}`, rightVal - (lottery?.length * 5), x)
        x = x + 20
    }

    if (invoice?.lotteryCardQuantity) {
        let lotteryCard = convertNumber(invoice?.lotteryCardQuantity * invoice?.lotteryCardRate)
        doc.text(`Lottery Card      € ${convertNumber(invoice?.lotteryCardRate)} / piece`, 60, x)
        // console.log('invoice?.couponCardRate', invoice?.couponCardRate)
        doc.text(`${invoice?.lotteryCardQuantity} cards x € ${convertNumber(invoice?.lotteryCardRate)}`, leftVal, x)

        doc.text(`€ ${lotteryCard}`, rightVal - (lotteryCard?.length * 5), x)
        x = x + 20

    }

    if (invoice?.giftCardsQuantity && invoice?.giftCardsRate) {
        let giftCard = convertNumber(invoice?.giftCardsQuantity * invoice?.giftCardsRate)
        doc.text(`Gift Card      € ${convertNumber(invoice?.giftCardsRate)} / piece`, 60, x)
        // console.log('invoice?.couponCardRate', invoice?.couponCardRate)
        doc.text(`${invoice?.giftCardsQuantity} cards x € ${convertNumber(invoice?.giftCardsRate)}`, leftVal, x)

        doc.text(`€ ${giftCard}`, rightVal - (giftCard?.length * 5), x)
        x = x + 20
    }

    if (invoice?.giftCardsPrice) {
        let giftCard = convertNumber(invoice?.giftCardsQuantity * invoice?.giftCardsPrice)
        doc.text(`Gift Card value      € ${convertNumber(invoice?.giftCardsPrice)} / piece`, 60, x)
        // console.log('invoice?.couponCardRate', invoice?.couponCardRate)
        doc.text(`${invoice?.giftCardsQuantity} cards x € ${convertNumber(invoice?.giftCardsPrice)}`, leftVal, x)

        doc.text(`€ ${giftCard}`, rightVal - (giftCard?.length * 5), x)
        x = x + 20

    }


    if (invoice?.subscriptionName === 'Double Chance Game') {
        let amount = convertNumber(invoice?.subscriptionAmount)
        doc.text(`Game Of Chance      € ${convertNumber(invoice?.totalAmount)}`, 60, x)

        // doc.text(`${invoice?.postalCardQuantity} cards x € ${convertNumber(invoice?.postalCardRate)}`, leftVal, x)

        // doc.text(`€ ${amount}`, rightVal - (postalCard?.length * 5), x)
        doc.text(`€ ${amount}`, rightVal - (amount?.length * 5), x)
        x = x + 20
    }
    if (invoice?.subscriptionName === 'Wallet Recharge subscription') {
        let amount = convertNumber(invoice?.subscriptionAmount)
        doc.text(`Wallet Recharge      € ${convertNumber(invoice?.totalAmount)}`, 60, x)

        // doc.text(`${invoice?.postalCardQuantity} cards x € ${convertNumber(invoice?.postalCardRate)}`, leftVal, x)

        // doc.text(`€ ${amount}`, rightVal - (postalCard?.length * 5), x)
        doc.text(`€ ${amount}`, rightVal - (amount?.length * 5), x)
        x = x + 20
    }

    if (invoice?.subscriptionName == 'Gift Card Pay') {
        let amount = convertNumber(invoice?.totalAmount)
        // doc.text(`Gift Card Pay      € ${convertNumber(invoice?.totalAmount)}`, 60, x)
        doc.text(`Gift Card Pay      `, 60, x)


        doc.text(`€ ${amount - invoice?.totalProvision}`, rightVal - (amount?.length * 5), x)
        x = x + 20
    }
    // if (invoice?.totalProvision) {
    //     let provision = convertNumber(invoice?.totalProvision)
    //     doc.text(`7% provision of GiftCard value       `, 60, x)
    //     // doc.text(`(min:€ 0.5, max: € 2)`, 250, x)
    //     // doc.text(`(min:€ 0.5, max: € 2)`, leftVal, x)

    //     doc.text(`€ ${provision}`, rightVal - (provision?.length * 5) - 8, x)
    //     x = x + 20
    // }
    x = x + 80

    doc.text('Subtotal', leftVal, x)

    // let SubTotaal = convertNumber(invoice?.totalAmount * (100 / 121))
    let SubTotaal = invoice?.giftCardsPrice ? convertNumber((invoice?.totalAmount - (invoice?.giftCardsQuantity * invoice?.giftCardsPrice)) * (100 / 121)) : convertNumber(invoice?.totalAmount * (100 / 121))

    let total = convertNumber(invoice?.totalAmount)

    if (invoice?.subscriptionName !== 'Wallet Recharge subscription' && invoice?.subscriptionName !== 'Gift Card Pay' && !invoice?.giftCardsPrice) {
        console.log('*** 8', invoice?.subscriptionName)

        doc.text(`€ ${SubTotaal}`, rightVal - (SubTotaal?.length * 5), x)

        x = x + 20

        doc.text('21 % BTW', leftVal, x)

        let btw = convertNumber(invoice?.totalAmount * (21 / 121))

        doc.text(`€ ${btw}`, rightVal - (btw?.length * 5), x)

        x = x + 20

        doc.text('Total incl BTW', leftVal, x)

    }
    else if (invoice?.giftCardsRate && invoice?.giftCardsPrice) {

        doc.text(`€ ${SubTotaal}`, rightVal - (SubTotaal?.length * 5), x)

        x = x + 20

        doc.text('21 % BTW', leftVal, x)

        let btw = convertNumber((invoice?.totalAmount - (invoice?.giftCardsQuantity * invoice?.giftCardsPrice)) * (21 / 121))

        doc.text(`€ ${btw}`, rightVal - (btw?.length * 5), x)

        x = x + 20

        let cardsValue = convertNumber(invoice?.giftCardsQuantity * invoice?.giftCardsPrice)

        doc.text('Cards Value', leftVal, x)

        doc.text(`€ ${cardsValue}`, rightVal - (cardsValue?.length * 5), x)

        x = x + 20

        doc.text('Total incl BTW', leftVal, x)
    }
    else if (!invoice?.giftCardsRate && invoice?.giftCardsPrice) {
        SubTotaal = convertNumber(invoice?.totalAmount)

        doc.text(`€ ${SubTotaal}`, rightVal - (SubTotaal?.length * 5), x)

        x = x + 20

        doc.text('0 % BTW', leftVal, x)

        let btw = convertNumber((invoice?.totalAmount - (invoice?.giftCardsQuantity * invoice?.giftCardsPrice)) * (21 / 121))

        doc.text(`€ ${btw}`, rightVal - (btw?.length * 5), x)

        x = x + 20

        doc.text('Total incl BTW', leftVal, x)
    }
    else {

        if (invoice?.totalProvision) {
            console.log('abc', total)
            console.log('invoice?.totalProvision', typeof invoice?.totalProvision)
            
            let totalwithProvision = Number(total) - invoice?.totalProvision
            totalwithProvision = convertNumber(totalwithProvision)

            doc.text(`€ ${totalwithProvision}`, rightVal - (totalwithProvision?.length * 5), x)
            x = x + 20
            doc.text('7 % provision', leftVal, x)
            
            let provision = convertNumber(invoice?.totalProvision)
            doc.text(`€ ${provision} `, rightVal - (provision?.length * 5), x)
            
            x = x + 20
            doc.text('Total ', leftVal, x)
        } else {

            doc.text(`€ ${total}`, rightVal - (total?.length * 5), x)
            x = x + 20
            doc.text('0 % BTW', leftVal, x)
            
            let btw = convertNumber(invoice?.totalAmount * (21 / 121))
            doc.text(`€ 0 `, rightVal - (btw?.length * 5), x)
            
            x = x + 20
            doc.text('Total ', leftVal, x)
        }
    }

    doc.text(`€ ${total}`, rightVal - (total?.length * 5), x)


    x = x + 40

    // doc.text(`Wij zien uw betaling graag binnen 5 dagen tegemoet tnv 2keepintouch.com`, 60, x)

    x = x + 20

    doc.text('______________________________________________________________________________________', 60, x)

    x = x + 20

    doc.font('Helvetica-Bold').text('2keepintouch.com | Bureau Integra bv | Wijngaardenlaan 17 | 2252 XJ Voorschoten', 105, x)

    x = x + 20

    doc.text('ING NL37 INGB 0004 6739 78 | Kvknr: 28104652 | BTW: NL818216864B02', 130, x)

    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        if (action === 'view') {
            return viewInvoice(url)
        }

        window.open(url, '_blank')
    })
}

const createProvisionInvoice = async (invoice, action, viewInvoice) => {
    // console.log('create Invoice Pdf function is working')
    const doc = new PDFDocument()

    const stream = doc.pipe(blobStream())

    let iconUrl = 'https://res.cloudinary.com/dklfq58uq/image/upload/v1641853789/invoice-icon_czczkc.jpg'

    let imageBase64 = await toBase64(iconUrl)

    doc.image(imageBase64, 410, 10, { width: 150, height: 130 })

    doc.fontSize(12).text(`Report Id: ${invoice?._id}`, 60, 220)

    doc.fontSize(13).text(`Period: ${dateFormater(invoice?.dateRange.date1)} - ${dateFormater(invoice?.dateRange.date2)}`, 60, 240)

    doc.text(`Voorschoten, ${dateFormater(invoice?.created)}`, 60, 260)

    doc.font('Helvetica').fontSize(10).text('______________________________________________________________________________________', 60, 270)

    let x = 290
    let leftVal = 360
    let rightVal = 515

    doc.text(`Provison:`, 60, x)

    let price = convertNumber(invoice?.totalProvision)

    doc.text(`€ ${price}`, rightVal - (price?.length * 5), x)

    x = x + 80

    doc.text('Subtotal', leftVal, x)
    let SubTotaal = convertNumber(invoice?.totalProvision * (100 / 121))

    doc.text(`€ ${SubTotaal}`, rightVal - (SubTotaal?.length * 5), x)

    x = x + 20

    doc.text('21 % BTW', leftVal, x)

    let btw = convertNumber(invoice?.totalProvision * (21 / 121))

    doc.text(`€ ${btw}`, rightVal - (btw?.length * 5), x)

    x = x + 20

    doc.text('Total incl BTW', leftVal, x)
    let total = convertNumber(invoice?.totalProvision)

    doc.text(`€ ${total}`, rightVal - (total?.length * 5), x)


    x = x + 20

    doc.text('______________________________________________________________________________________', 60, x)

    x = x + 20

    doc.font('Helvetica-Bold').text('2keepintouch.com | Bureau Integra bv | Wijngaardenlaan 17 | 2252 XJ Voorschoten', 105, x)

    x = x + 20

    doc.text('ING NL37 INGB 0004 6739 78 | Kvknr: 28104652 | BTW: NL818216864B02', 130, x)

    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        if (action === 'view') {
            return viewInvoice(url)
        }

        window.open(url, '_blank')
    })
}


const toBase64 = (url) => {
    return new Promise(async (resolve, reject) => {
        var https = require('https')
        var req = await https.get(url, (res) => {
            res.setEncoding('base64')
            let body = 'data:' + res.headers['content-type'] + ';base64,'
            res.on('data', (d) => {
                body += d
            })
            res.on('end', () => {
                resolve(body)
            })
        })
        req.on('error', err => {
            console.error('error!', err)
            reject(err)
        })

    });

}

const createLoyaltyCard = async (arr, loyaltyAdvertisment) => {
    try {
        const doc = new PDFDocument({ size: [907.1, 1275.6] })
        const stream = doc.pipe(blobStream())

        let width = 209.76
        let height = 147.4

        var x = 13
        var y = 10

        let iconUrl = loyaltyAdvertisment?.imageUrl || 'https://res.cloudinary.com/dklfq58uq/image/upload/v1641853789/invoice-icon_czczkc.jpg'
        console.log('iconUrl', iconUrl)
        let imageBase64 = await toBase64(iconUrl)

        for (var i in arr) {
            let obj = arr[i]

            doc.image(imageBase64, x, y, { width, height })

            var index = Number(i) + 1

            if (index % 32 === 0) {
                x = 13
                y = 10
                doc.addPage()
            }
            else if (index % 4 === 0) {
                x = 13
                y += height + 10
            }
            else {
                x += width + 14
            }

        }

        doc.addPage()

        var xAxis = 0
        var yAxis = 0
        let QRwidth = 180
        let QRheight = 100

        for (var i in arr) {
            let obj = arr[i]

            doc.moveTo(20 + xAxis, 20 + yAxis).lineTo(215 + xAxis, 20 + yAxis).stroke()
            doc.moveTo(20 + xAxis, 20 + yAxis).lineTo(20 + xAxis, 153 + yAxis).stroke()
            doc.moveTo(20 + xAxis, 153 + yAxis).lineTo(215 + xAxis, 153 + yAxis).stroke()
            doc.moveTo(215 + xAxis, 20 + yAxis).lineTo(215 + xAxis, 153 + yAxis).stroke()

            let qrImage = await generateQR(obj?.couponCode)

            let qrX = 60 + xAxis
            let qrY = 21 + yAxis

            doc.image(qrImage, qrX, qrY, { QRwidth, QRheight })

            y = 100 + yAxis
            x = 80 + xAxis
            let lineX = 78 + xAxis
            let lineY = 114 + yAxis
            var lineXEnd = 156 + xAxis

            lineY = lineY + 35
            y = y + 35

            doc.text(obj?.couponCode, x, y)
            doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()

            var index = Number(i) + 1

            if (index % 32 === 0) {
                xAxis = 0
                yAxis = 0
                doc.addPage()
            }
            else if (index % 4 === 0) {
                xAxis = 0
                yAxis += height + 10
            }
            else {
                xAxis += width + 14
            }

        }

        doc.end()
        stream.on('finish', () => {
            let url = stream.toBlobURL('application/pdf')
            console.log('url==>', url)
            window.open(url, '_blank')
        })

    } catch (e) {
        errorMessage(e)
    }
}

const createGiftCard = async (arr) => {
    const doc = new PDFDocument({ size: [907.1, 1275.6] })
    const stream = doc.pipe(blobStream())

    let width = 209.76
    let height = 147.4

    var x = 13
    var y = 10

    for (var i in arr) {
        let obj = arr[i]

        let iconUrl = arr[i].imageUrl || 'https://res.cloudinary.com/dklfq58uq/image/upload/v1641853789/invoice-icon_czczkc.jpg'
        let imageBase64 = await toBase64(iconUrl)
        doc.image(imageBase64, x, y, { width, height })

        var index = Number(i) + 1

        if (index % 32 === 0) {
            x = 13
            y = 10
            doc.addPage()
        }
        else if (index % 4 === 0) {
            x = 13
            y += height + 10
        }
        else {
            x += width + 14
        }
    }

    doc.addPage()

    var xAxis = 0
    var yAxis = 0
    let QRwidth = 180
    let QRheight = 100


    for (var i in arr) {
        let obj = arr[i]

        doc.moveTo(20 + xAxis, 20 + yAxis).lineTo(215 + xAxis, 20 + yAxis).stroke()
        doc.moveTo(20 + xAxis, 20 + yAxis).lineTo(20 + xAxis, 153 + yAxis).stroke()
        doc.moveTo(20 + xAxis, 153 + yAxis).lineTo(215 + xAxis, 153 + yAxis).stroke()
        doc.moveTo(215 + xAxis, 20 + yAxis).lineTo(215 + xAxis, 153 + yAxis).stroke()

        let qrImage = await generateQR(obj?.giftCardCode)

        let qrX = 60 + xAxis
        let qrY = 21 + yAxis

        doc.image(qrImage, qrX, qrY, { QRwidth, QRheight })

        y = 100 + yAxis
        x = 80 + xAxis
        let lineX = 78 + xAxis
        let lineY = 114 + yAxis
        var lineXEnd = 156 + xAxis

        lineY = lineY + 35
        y = y + 35

        doc.text(obj?.giftCardCode, x, y)
        doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()

        var index = Number(i) + 1

        if (index % 32 === 0) {
            xAxis = 0
            yAxis = 0
            doc.addPage()
        }
        else if (index % 4 === 0) {
            xAxis = 0
            yAxis += height + 10
        }
        else {
            xAxis += width + 14
        }
    }

    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        window.open(url, '_blank')
    })
}

const createLotteryCard = async (arr, loyaltyAdvertisment) => {
    const doc = new PDFDocument({ size: [907.1, 1275.6] })
    const stream = doc.pipe(blobStream())

    let width = 209.76
    let height = 147.4
    let QRwidth = 180
    let QRheight = 100

    var x = 13
    var y = 10

    let iconUrl = loyaltyAdvertisment?.imageUrl || 'https://res.cloudinary.com/dklfq58uq/image/upload/v1641853789/invoice-icon_czczkc.jpg'

    let imageBase64 = await toBase64(iconUrl)

    for (var i in arr) {
        let obj = arr[i]

        // let imageUrl = obj?.card1?.imageUrl || obj?.card2?.imageUrl || obj?.card3?.imageUrl || obj?.card4?.imageUrl || obj?.card5?.imageUrl

        // let imageBase64 = await toBase64(imageUrl)

        doc.image(imageBase64, x, y, { width, height })

        var index = Number(i) + 1

        if (index % 32 === 0) {
            x = 13
            y = 10
            doc.addPage()
        }
        else if (index % 4 === 0) {
            x = 13
            y += height + 10
        }
        else {
            x += width + 14
        }
    }

    doc.addPage()

    var xAxis = 0
    var yAxis = 0

    for (var i in arr) {
        let obj = arr[i]

        doc.moveTo(20 + xAxis, 20 + yAxis).lineTo(215 + xAxis, 20 + yAxis).stroke()
        doc.moveTo(20 + xAxis, 20 + yAxis).lineTo(20 + xAxis, 153 + yAxis).stroke()
        doc.moveTo(20 + xAxis, 153 + yAxis).lineTo(215 + xAxis, 153 + yAxis).stroke()
        doc.moveTo(215 + xAxis, 20 + yAxis).lineTo(215 + xAxis, 153 + yAxis).stroke()

        let qrImage = await generateQR(obj?.lotteryCode)

        let qrX = 60 + xAxis
        let qrY = 21 + yAxis

        doc.image(qrImage, qrX, qrY, { QRwidth, QRheight })

        y = 100 + yAxis
        x = 80 + xAxis
        let lineX = 78 + xAxis
        let lineY = 114 + yAxis
        var lineXEnd = 156 + xAxis

        lineY = lineY + 35
        y = y + 35
        doc.text(obj?.lotteryCode, x, y)
        doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()

        var index = Number(i) + 1

        if (index % 32 === 0) {
            xAxis = 0
            yAxis = 0
            doc.addPage()
        }
        else if (index % 4 === 0) {
            xAxis = 0
            yAxis += height + 10
        }
        else {
            xAxis += width + 14
        }
    }

    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        window.open(url, '_blank')
    })
}


const createPostalCard = async (arr) => {
    const doc = new PDFDocument({ size: [907.1, 1275.6] })
    const stream = doc.pipe(blobStream())

    let width = 405.3
    let height = 283.4

    var x = 0
    var y = 0

    for (var i in arr) {
        let obj = arr[i]

        let imageUrl = obj?.card1?.imageUrl || obj?.card2?.imageUrl || obj?.card3?.imageUrl || obj?.card4?.imageUrl || obj?.card5?.imageUrl

        let imageBase64 = await toBase64(imageUrl)

        doc.image(imageBase64, x, y, { width, height })

        if (Number(i) % 2 === 1) {
            x = 0
            y += height + 20
        }
        else {
            x += width + 35
        }
    }

    doc.addPage()

    var xAxis = 0
    var yAxis = 0

    for (var i in arr) {
        let obj = arr[i]
        let guest = obj?.guest

        let message = draftToHtml(obj?.message1 || obj?.message2 || obj?.message3 || obj?.message4 || obj?.message5)

        message = message?.replace(/@guestName/gi, guest?.name)
        message = message?.replace(/@name/gi, obj?.userId?.fullName)
        message = message?.replace(/@guestEmail/gi, guest?.email)
        message = message?.replace(/@email/gi, obj?.userId?.email)
        message = message?.replace(/@businessName/gi, guest?.businessName)
        message = message?.replace(/&nbsp;/gi, ' ')

        let plainText = message?.replace(/<[^>]+>/g, '')

        doc.lineJoin('miter')
            .rect(380 + xAxis, 40 + yAxis, 45, 60)
            .stroke()

        let messageArray = chunk(plainText, 32)
        let x = 237 + xAxis
        let y = 70 + yAxis
        let lineX = 237 + xAxis
        let lineY = 125 + yAxis
        var text

        for (var v of messageArray) {
            text = v?.join('')
            doc.text(`${text}`, 40 + xAxis, y)
            y = y + 20
        }

        let lineXStart = 35

        doc.moveTo(lineXStart + xAxis, lineXStart + yAxis).lineTo(430 + xAxis, lineXStart + yAxis).stroke()
        doc.moveTo(lineXStart + xAxis, lineXStart + yAxis).lineTo(lineXStart + xAxis, 298 + yAxis).stroke()
        doc.moveTo(lineXStart + xAxis, 298 + yAxis).lineTo(430 + xAxis, 298 + yAxis).stroke()
        doc.moveTo(430 + xAxis, lineXStart + yAxis).lineTo(430 + xAxis, 298 + yAxis).stroke()

        doc.moveTo(232.5 + xAxis, 45 + yAxis).lineTo(232.5 + xAxis, 290 + yAxis).stroke()

        y = 110 + yAxis
        var lineXEnd = 420 + xAxis

        if (guest?.businessName) {
            doc.text(guest?.businessName, x, y)
            doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()
        }

        lineY = lineY + 35
        y = y + 35

        doc.text(guest?.name, x, y)
        doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()

        lineY = lineY + 35
        y = y + 35

        doc.text(guest?.streetHouse, x, y)
        doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()

        lineY = lineY + 35
        y = y + 35

        doc.text(guest?.postalCodeCity, x, y)
        doc.moveTo(lineX, lineY).lineTo(lineXEnd, lineY).stroke()

        lineY = lineY + 35
        y = y + 35

        doc.text(guest?.country, x, y)

        if (Number(i) % 2 === 1) {
            xAxis = 0
            yAxis += height + 20
        }
        else {
            xAxis += width + 35
        }
    }

    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        window.open(url, '_blank')
    })
}

const createFrontSide = async (obj) => {
    const doc = new PDFDocument({
        size: [405.3, 283.4],
    })

    let imageUrl = obj?.card1?.imageUrl || obj?.card2?.imageUrl || obj?.card3?.imageUrl || obj?.card4?.imageUrl || obj?.card5?.imageUrl

    let imageBase64 = await toBase64(imageUrl)

    const stream = doc.pipe(blobStream())

    doc.image(imageBase64, 0, 0, { width: 405.3, height: 283.4 })

    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        window.open(url, '_blank')
    })
}

const createBackSide = async (obj) => {
    const doc = new PDFDocument({ size: [405.3, 283.4] })

    let guest = obj?.guest

    let message = draftToHtml(obj?.message1 || obj?.message2 || obj?.message3 || obj?.message4 || obj?.message5)

    message = message?.replace(/@guestName/gi, guest?.name)
    message = message?.replace(/@name/gi, obj?.userId?.fullName)
    message = message?.replace(/@guestEmail/gi, guest?.email)
    message = message?.replace(/@email/gi, obj?.userId?.email)
    message = message?.replace(/@businessName/gi, guest?.businessName)
    message = message?.replace(/&nbsp;/gi, ' ')

    let plainText = message?.replace(/<[^>]+>/g, '')

    const stream = doc.pipe(blobStream())

    doc.lineJoin('miter')
        .rect(350, 10, 45, 60)
        .stroke()

    let messageArray = chunk(plainText, 32)
    let y = 40
    let x = 207
    let lineX = 207
    let lineY = 105
    var text

    for (var v of messageArray) {
        text = v?.join('')
        // lastChar = text?.slice(-1,)[0]

        // if (y === 40) {
        //     if (lastChar.charCodeAt(0) >= 65 && lastChar.charCodeAt(0) <= 90 || lastChar.charCodeAt(0) >= 97 && lastChar.charCodeAt(0) <= 122) {
        //         doc.text(`${text}-`, 10, y)
        //     }
        //     else {
        //         doc.text(`${text}`, 10, y)
        //     }
        // }
        // else {
        //     doc.text(`${text}`, 10, y)
        // }
        doc.text(`${text}`, 10, y)
        y = y + 20
    }

    doc.moveTo(5, 5).lineTo(400, 5).stroke()
    doc.moveTo(5, 5).lineTo(5, 278).stroke()
    doc.moveTo(5, 278).lineTo(400, 278).stroke()
    doc.moveTo(400, 5).lineTo(400, 278).stroke()

    doc.moveTo(202.5, 15).lineTo(202.5, 260).stroke()

    y = 90

    if (guest?.businessName) {
        doc.text(guest?.businessName, x, y)
        doc.moveTo(lineX, lineY).lineTo(390, lineY).stroke()
    }

    lineY = lineY + 35
    y = y + 35

    doc.text(guest?.name, x, y)
    doc.moveTo(lineX, lineY).lineTo(390, lineY).stroke()

    lineY = lineY + 35
    y = y + 35

    doc.text(guest?.streetHouse, x, y)
    doc.moveTo(lineX, lineY).lineTo(390, lineY).stroke()

    lineY = lineY + 35
    y = y + 35

    doc.text(guest?.postalCodeCity, x, y)
    doc.moveTo(lineX, lineY).lineTo(390, lineY).stroke()

    lineY = lineY + 35
    y = y + 35

    doc.text(guest?.country, x, y)
    doc.end()

    stream.on('finish', () => {
        let url = stream.toBlobURL('application/pdf')

        window.open(url, '_blank')
    })
}

const setHoursMinutes = (val) => momentTz(val).set('hour', 0).set('minute', 0).set('second', 0)

const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

const disabledDate = (current) => {
    let customDate = momentTz().format('YYYY-MM-DD')
    return current && current < momentTz(customDate, 'YYYY-MM-DD')
}

const absoluteDate = (date, hour) => {
    let d = absoluteLocalDate(date, hour)

    return momentTz.utc(d)
}

const absoluteLocalDate = (date, hour) => {
    let d = momentTz(date)

    d.set('hours', 0)
    d.set('seconds', 0)

    d.set('minutes', hour || 0)

    return d
}

const relativeDate = (date, hour) => {
    let d = momentTz().add(date, 'days')

    d.set('hours', 0)
    d.set('seconds', 0)

    d.set('minutes', hour || 0)

    return momentTz.utc(d)
}

const absoluteDateTz = (date, hour) => {
    let d = absoluteLocalDateTz(date, hour)

    return momentTz.utc(d)
}

const absoluteLocalDateTz = (date, hour) => {
    let d = momentTz(date)

    d.set('hours', 0)
    d.set('seconds', 0)

    d.set('minutes', hour || 0)

    return d
}

const relativeDateTz = (date, hour) => {
    let d = momentTz().add(date, 'days')

    d.set('hours', 0)
    d.set('seconds', 0)

    d.set('minutes', hour || 0)

    return momentTz.utc(d)
}

const stringLimiter = (val, limit = 50) => val?.length > limit ? `${val.slice(0, limit)}...` : val

const generateQR = async (text) => {
    let result = await QRCode.toDataURL(text)

    return result
}

const provisionCalculate = (amount) => {
    let provisionPercentage = amount * 0.07
    if (provisionPercentage > 0.5 && provisionPercentage < 2) {
        return convertNumber(provisionPercentage)
    } else if (provisionPercentage < 0.5) {
        return 0.5
    } else {
        return 2
    }
}

export {
    requiredMessage,
    inputPlace,
    setActiveMenu,
    successMessage,
    infoMessage,
    errorMessage,
    warningMessage,
    successNotification,
    errorNotification,
    facebookLogin,
    googleLogin,
    convertTitle,
    convertDate,
    getAllData,
    setActiveAdminMenu,
    datePlace,
    getAllSegments,
    getAllUserData,
    convertNumber,
    convertFloat,
    createInvoicePdf,
    dateFormater,
    convertMessage,
    createPostalCard,
    splitDate,
    setHoursMinutes,
    createFrontSide,
    createBackSide,
    getBase64,
    disabledDate,
    absoluteDate,
    relativeDate,
    absoluteLocalDate,
    absoluteDateTz,
    absoluteLocalDateTz,
    relativeDateTz,
    stringLimiter,
    createLoyaltyCard,
    createLotteryCard,
    generateQR,
    createGiftCard,
    provisionCalculate,
    createProvisionInvoice
}