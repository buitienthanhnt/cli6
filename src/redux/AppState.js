let AppState = {
    _tha_sid: "",
    paper_id: 46,
    number: 2,
    user_data: null,
    cart_data: null,
    message_count: null,
    data: [
        { title: 'Go to the office', isFinished: true },
        { title: 'Prepare tasks for today', isFinished: false },
        { title: 'Team meeting', isFinished: false },
        { title: 'Commit tasks changed', isFinished: false }
    ],
};

let Application = {
    address: '',
    lang: '',
    currency: '',
    key: 112345443
};

export {AppState, Application};