const adminApi = `/api/admin`
const authApi = `/api/user`
const getApi = `/api/get`
const postApi = `/api/post`

const AUTH = {
    LOGIN: `${authApi}/login`,
    SIGNUP: `${authApi}/signup`,
    CHANGE_PASSWORD: `${authApi}/change-password`,
    CHANGE_ROLE: `${authApi}/change-role`,
    UPDATE_SETTINGS: `${authApi}/update-settings`,
    DELETE_ACCOUNT: `${authApi}/delete-account`,
    FORGOT_PASSWORD: `${authApi}/forgot-password`,
    UPDATE_PASSWORD: `${authApi}/update-password`
}

const GET = {
    USER_BY_ID: `${getApi}/get-user`,
    ALL_USERS: `${getApi}/get-all-users`,
    ALL_BUSINESS_USERS: `${getApi}/get-all-bu-users`,
    ALL_SEGMENTS: `${getApi}/get-all-segments`,
    ALL_INVITES: `${getApi}/get-all-invites`,
    SEGMENT_BY_ID: `${getApi}/get-segment`,
    SEGMENT_MESSAGES_BY_ID: `${getApi}/get-segment-messages`,
    ALL_CARDS: `${getApi}/get-all-cards`,
    SUBSCRIPTION: `${getApi}/get-subscriptions`,
    ACTIVE_SUBSCRIPTION: `${getApi}/get-active-subscriptions`,
    POSTAL_CARD: `${getApi}/get-postal-card`,
    GUESTS: `${getApi}/get-guests`,
    GUESTS_BY_SEGMENT: `${getApi}/get-guests-by-segment`,
    PAYMENT_STATUS: `${getApi}/get-payment-status`,
    INVOICES: `${getApi}/get-invoices`,
    VERIFY_TOKEN: `${getApi}/verifytoken`,
    VERIFY_GUEST: `${getApi}/verifyguest`,
    VERIFY_EMAIL: `${getApi}/verifyemail`,
    CARDS_BY_ID: `${getApi}/get-cards-by-id`,
    SEGMENTS_BY_ID: `${getApi}/get-segments-by-id`,
    WHATSAPP_SUBSCRIPTION: `${getApi}/get-whatsapp-subscription`,
    CARD_SUBSCRIPTION: `${getApi}/get-card-subscription`,
    LOYALTY_SUBSCRIPTION: `${getApi}/get-loyalty-subscription`,
    GIFT_CARD_SUBSCRIPTION: `${getApi}/get-gift-card-subscription`,
    LOTTERY_SUBSCRIPTION: `${getApi}/get-lottery-subscription`,
    ALL_QUESTIONS_FORM: `${getApi}/get-all-questions-form`,
    FORM: `${getApi}/get-form`,
    ADVERTISEMENT: `${getApi}/get-advertisement`,
    ALL_COUPONS_DETAIL: `${getApi}/get-all-coupons-detail`,
    ALL_LOTTERY_DETAIL: `${getApi}/get-all-lottery-detail`,
    COUPONS_DETAIL: `${getApi}/coupon-detail`,
    SAVINGS: `${getApi}/get-savings`,
    FORM_REPORTS: `${getApi}/get-form-reports`,
    GET_NOTIFICATION: `${getApi}/get-notification`,
    GET_LOYALTY_ADVERTISEMENT: `${getApi}/get-loyalty-advertisement`,
    GET_USER_LOTTERIES: `${getApi}/get-lottery-by-userId`,
    GET_ALL_LOTTERY_DETAIL: `${getApi}/get-all-lotteries-detail`,
    // VIEW_LOTTERY_DETAL:`${getApi}/get-all-lotteries-detail`
    GET_USER_CASH_BACK: `${getApi}/get-cash-back`,
    GET_USER_CASH_BACK_AMOUNT: `${getApi}/get-user-cash-back-amount`,
    GET_USER_WALLET: `${getApi}/get-user-wallet`,
    GET_USER_DOUBLE_CHANCE_INVOICE: `${getApi}/get-user-double-chance-invoice`,
    USER_JOINED_GROUPS: `${getApi}/user-joined-groups`,
    USER_PENDING_GROUPS: `${getApi}/user-pending-groups`,
    GET_ALL_LOYALTY_WITHDRAW_REQUEST: `${getApi}/get-all-loyalty-withdraw-request`,//param guestId
    GET_ALL_LOYALTY_WITHDRAW_REQUEST_FOR_BU_USER: `${getApi}/get-all-loyalty-withdraw-request-for-bu-user`,//param userId
    BU_USER_COUPON_INFO: `${getApi}/bu-user-coupon-info`,//param userId
    // GIFT CARS
    GET_ALL_USER_GIFT_CARDS: `${getApi}/get-all-user-gift-cards`,//param userId
    GET_ALL_BUUSER_GIFT_CARDS: `${getApi}/get-gift-cards-for-bu-users`,//param userId
    GET_USER_GIFT_CARD_CLAIM_REQUEST: `${getApi}/get-user-gift-cards-claim-req`,//POST userId
    GET_GIFT_CARD_USERS: `${getApi}/get-all-gift-cards-settelment-users`,//POST userId
    
    // GET GUEST GIFT CARDS 
    GET_GUEST_UPDATED_GIFT_CARDS: `${getApi}/get-guest-updated-gift-cards`,//PARAMS userId
    
}

const POST = {
    GET_USER_ALL_LOTTERIES: `${postApi}/get-user-all-lotteries`,
    GET_LOTTERY_PRIZE_WINNERS: `${postApi}/get-lottery-prize-winners`,
    CREATE_GUEST: `${postApi}/create-guest`,
    INVITE_GUEST: `${postApi}/invite-guest`,
    DELETE_GUEST: `${postApi}/delete-guest`,
    DELETE_GUEST_LINK: `${postApi}/delete-guest-link`,
    CREATE_SEGMENT_MESSAGE: `${postApi}/create-segment-message`,
    DELETE_SEGMENT_MESSAGE: `${postApi}/delete-segment-message`,
    UPDATE_SUBSCRIPTION: `${postApi}/update-subscription`,
    CREATE_SUBSCRIPTION: `${postApi}/create-subscription`,
    ADD_MORE_CARDS: `${postApi}/add-more-cards`,
    ADD_MORE_WHATSAPP_MESSAGES: `${postApi}/add-more-whatsapp-messages`,
    ADD_MORE_COUPONS: `${postApi}/add-more-coupons`,
    ADD_MORE_CARD_COUPONS: `${postApi}/add-more-card-coupons`,
    ADD_CARD_LOTTERIES: `${postApi}/add-card-lottery`,
    ADD_LOTTERIES: `${postApi}/add-lottery`,
    GET_ALL_BUSINESS_USER: `${postApi}/get-all-business-user`,
    CREATE_COUPONS: `${postApi}/generate-coupon`,
    CREATE_QUESTIONS_FORM: `${postApi}/questions-form`,
    DELETE_FORM: `${postApi}/delete-form`,
    CREATE_ADVERTISEMENT: `${postApi}/advertisement`,
    EDIT_ADVERTISEMENT: `${postApi}/edit-advertisement`,
    DELETE_ADVERTISEMENT: `${postApi}/delete-advertisement`,
    ACTIVE_ADVERTISEMENT: `${postApi}/active-advertisement`,
    GET_ALL_ACTIVE_ADVERTISEMENT: `${postApi}/get-all-active-advertisement`,
    FEEDBACK: `${postApi}/user-feedback`,
    CLAIM_COUPON: `${postApi}/claim-coupon`,
    VIEW_COUPON_DETAIL: `${postApi}/view-coupon-detail`,
    CREATE_FORM_REPORT: `${postApi}/create-form-report`,
    DELETE_FORM_REPORT: `${postApi}/delete-form-report`,
    CREATE_NOTIFICATION: `${postApi}/create-notification`,
    MINIMUM_WITHDRAWAL_AMOUNT: `${postApi}/minimun-with-drawal-amount`,
    CREATE_LOYALTY_ADVERTISEMENT: `${postApi}/create-loyalty-advertisement`,
    EDIT_LOYALTY_ADVERTISEMENT: `${postApi}/edit-loyalty-advertisement`,
    DELETE_LOYALTY_ADVERTISEMENT: `${postApi}/delete-loyalty-advertisement`,
    ACTIVE_LOYALTY_ADVERTISEMENT: `${postApi}/active-loyalty-advertisement`,
    EXTEND_SUBSCRIPTION_EXPIRY: `${postApi}/extend-subscription-expiry`,
    SET_LOTTERY_PRIZE: `${postApi}/set-lottery-prize`,
    DELETE_LOTTERY_PRIZE: `${postApi}/delete-lottery`,
    UPDATE_LOTTERY_PRIZE: `${postApi}/update-lottery`,
    CLAIM_LOTTERY: `${postApi}/claim-lottery`,
    CLAIM_LOTTERY_DETAIL: `${postApi}/claim-lottery-detail`,
    CASH_BACK_REQUEST: `${postApi}/cash-back-request`,
    ACCEPT_WITH_DRAW_REQUEST: `${postApi}/accept-with-draw-request`,
    WITH_DRAW_REQUEST: `${postApi}/with-draw-request`,
    GET_WITH_DRAW_REQUEST_GUEST: `${postApi}/get-with-draw-request-guest`,
    GET_WITH_DRAW_REQUEST_USER: `${postApi}/get-with-draw-request-user`,
    DOUBLE_CHANCES_SUBSCRIPTION: `${postApi}/double-chances`,
    REMOVE_DOUBLE_CHANCES_SUBSCRIPTION: `${postApi}/remove-double-chances`,
    GET_LOTTERY_SAVINGS: `${postApi}/get-lottery-savings`,
    WALLET_RECHARGE: `${postApi}/wallet-recharge`,
    JOIN_GROUP: `${postApi}/join-group`,
    GET_PRIZES_FOR_GUEST: `${postApi}/get-prizes-for-guest`,
    CREATE_LOYALTY_WITHDRAW_REQUEST: `${postApi}/create-loyalty-withdraw-request`,
    ACCEPT_LOYALTY_WITH_DRAW_REQUEST: `${postApi}/accept-loyalty-withdraw-request`,
    ADD_MORE_GIFTCARDS: `${postApi}/add-gift-cards`,
    SET_PRIZES_OF_GIFT_CARDS: `${postApi}/set-prizes-of-gift-cards`,
    // SET_PRIZES_OF_GIFTCARDS: `${postApi}/set-prizes-on-gift-cards`,
    VERIFY_GIFT_CARDS: `${postApi}/verify-gift-card`,
    GIFT_CARDS_ACCEPT_REQUESTS: `${postApi}/claim-req-for-gift-card`,
    CHANGE_PRIZE_OF_GIFT_CARDS: `${postApi}/change-prize-of-admin-gift-card`,
    GUEST_PURCHASE_GIFT_CARDS: `${postApi}/guest-purchased-gift-card`,
    CLAIM_BU_GIFT_CARD: `${postApi}/claim-bu-gift-card`,
}

const ADMIN = {
    LOGIN: `${adminApi}/login`,
    ADMIN_BY_ID: `${adminApi}/get-admin`,
    CREATE_SEGMENT: `${adminApi}/create-segment`,
    GET_SEGMENTS: `${adminApi}/get-segments`,
    DELETE_SEGMENT: `${adminApi}/delete-segment`,
    CREATE_CARD: `${adminApi}/create-card`,
    GET_CARDS: `${adminApi}/get-cards`,
    GET_ALL_CARDS: `${adminApi}/get-all-cards`,
    GET_USERS_INVOICES: `${adminApi}/get-users-invoices`,
    GET_MESSAGES_LIST: `${adminApi}/get-messages-list`,
    GET_POSTAL_CARDS: `${adminApi}/get-postal-cards`,
    GET_LOYALTY_CARDS: `${adminApi}/get-loyalty-cards`,
    GET_LOTTERY_CARDS: `${adminApi}/get-lottery-cards`,
    CREATE_MESSAGES_REPORT: `${adminApi}/create-messages-report`,
    GET_MESSAGES_REPORTS: `${adminApi}/get-messages-reports`,
    DELETE_MESSAGES_REPORT: `${adminApi}/delete-messages-report`,
    CREATE_FINANCIAL_REPORT: `${adminApi}/create-financial-report`,
    GET_FINANCIAL_REPORTS: `${adminApi}/get-financial-reports`,
    DELETE_FINANCIAL_REPORT: `${adminApi}/delete-financial-report`,
    UPDATE_STOCK: `${adminApi}/update-stock`,
    CREATE_STOCK_REPORT: `${adminApi}/create-stock-report`,
    GET_STOCK_REPORTS: `${adminApi}/get-stock-reports`,
    DELETE_STOCK_REPORT: `${adminApi}/delete-stock-report`,
    DELETE_CARD: `${adminApi}/delete-card`,
    CREATE_QUESTION: `${adminApi}/create-question`,
    EDIT_QUESTION: `${adminApi}/edit-question`,
    DELETE_QUESTION: `${adminApi}/delete-question`,
    // CREATE_QUESTIONS_FORM:`${postApi}/questions-form`,
    GET_QUESTION: `${adminApi}/get-questions`,
    GET_QUESTION_WITH_TYPE: `${adminApi}/get-questions-type`,
    CREATE_ADMIN_ADVERTISEMENT: `${adminApi}/create-advertisement`,
    DELETE_ADMIN_ADVERTISEMENT: `${adminApi}/delete-advertisement`,
    GET_ADMIN_ADVERTISEMENT: `${adminApi}/get-admin-advertisement`,
    SET_ACTIVE_ADMIN_ADVERTISEMENT: `${adminApi}/set-active-admin-advertisement`,
    UPDATE_COUPON_DISCOUNT: `${adminApi}/coupon-discount`,
    GET_COUPON_DISCOUNT: `${adminApi}/get-coupon-discount`,
    GET_ALL_ACTIVE_ADMIN_ADVERTISEMENT: `${adminApi}/get-all-active-admin-advertisement`,
    EACH_MONTH_LOTTETY_PRIZE: `${adminApi}/each-month-lottery-prize`,
    EACH_MONTH_ALL_LOTTETY_CODES: `${adminApi}/each-month-all-lottery-codes`,
    GET_ALL_LOTTERY_PRIZE_WINNERS: `${adminApi}/get-all-lottery-prize-winners`,
    GET_ALL_CASH_BACKS: `${adminApi}/get-all-cash-backs`,
    CONFIRM_CASH_BACK: `${adminApi}/confirm-cash-back`,
    GET_DOUBLE_OF_CHANCE_GUEST: `${adminApi}/get-double-chance-guest`,
    CREATE_GROUP: `${adminApi}/create-group`,
    EDIT_GROUP: `${adminApi}/edit-group`,
    DELETE_GROUP: `${adminApi}/delete-group`,
    GET_GROUPS: `${adminApi}/get-group`, /* GET API */
    INVITE_USER_IN_GROUP: `${adminApi}/invite-user-in-group`,
    GET_INVITED_USERS: `${adminApi}/get-invited-users`, /* GET API */
    DELETE_INVITED_USER: `${adminApi}/delete-user-invite`, /* POST API */
    GET_BU_USERS: `${adminApi}/get-bu-users`, /* POST API */
    CREATE_ADMIN_FORM_REPORTS: `${adminApi}/create-admin-form-reports`, /* POST API */
    GET_ADMIN_FORM_REPORTS: `${adminApi}/get-admin-form-reports`, /* POST API */
    DELETE_ADMIN_FORM_REPORTS: `${adminApi}/delete-admin-form-reports`, /* POST API */
    GET_GROUPS_FOR_ADMIN_ADV: `${adminApi}/get-groups-for-admin-adv`, /* GET API */
    CREATE_ADMIN_GROUP_ADVERTISEMENT: `${adminApi}/create-admin-group-adv`, /* POST API */
    GET_ADMIN_GROUP_ADVERTISEMENT: `${adminApi}/get-admin-group-adv`, /* GET API */
    DELETE_ADMIN_GROUP_ADVERTISEMENT: `${adminApi}/delete-admin-group-adv`, /* POST API */
    SET_ACTIVE_ADMIN_GROUP_ADVERTISEMENT: `${adminApi}/set-active-admin-group-adv`, /* POST API */
    EDIT_ADMIN_GROUP_ADVERTISEMENT: `${adminApi}/edit-admin-group-adv`, /* POST API */
    UPDATE_LOTTERY_WITHDRAW_DATE: `${adminApi}/updated-lottery-withdraw-date`, /* POST API */
    
    // giftCards
    CREATE_ADMIN_GIFT_CARDS: `${adminApi}/create-admin-gift-cards`, /* POST API */
    GET_ALL_ADMIN_GIFT_CARDS: `${adminApi}/get-all-admin-gift-cards`,//param userId
    GET_ALL_GIFT_CARDS_FOR_ADMIN: `${adminApi}/get-all-gift-cards-for-admin`,//param userId
    GET_ADMIN_NOTIFICATIONS: `${adminApi}/get-all-notification`,//param userId
    GET_ALL_GIFT_CARD_REQUEST: `${adminApi}/get-all-gift-cards-request`,//param userId
    ACCEPT_GIFT_CARD_REQUET: `${adminApi}/accept-gift-card-request`,//POST userId
    CREATE_GIFT_CARD_IMAGES: `${adminApi}/create-gift-cards-images`,//POST userId
    DELETE_GIFT_CARD_IMAGES: `${adminApi}/delete-gift-cards-images`,//POST userId
    GET_GIFT_CARD_IMAGES: `${adminApi}/get-gift-cards-images`,//POST userId
    SET_ACTIVE_GIFT_CARD_IMAGE: `${adminApi}/set-active-admin-gift-card-image`, /* POST API */
    GET_ALL_CHAPTERS: `${adminApi}/get-all-chapters`, /* GET API */
    GET_PROVISION_REPORTS: `${adminApi}/get-all-provision-reports`, /* GET API */
    
    GET_FILE_URL: `${adminApi}/get-file-url`, /* Post File */
    
}

export {
    AUTH,
    GET,
    POST,
    ADMIN
}