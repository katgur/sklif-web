import LS from './LSRequest';

const key = 'study';

const mock = [
    {
        key: 'S000000/',
        imagesCount: 26,
        keys: [
            'S000000/'
        ],
        studyId: 1,
        studyDescription: 'MIBS HEAD^BRAIN',
        studyDate: 20190121,
        studyTime: 141805.750000,
        seriesDescription: [
            'T2 cor'
        ],
        modality: [
            'MR'
        ],
        dataType: '',
        patientId: '048-001-0024477',
        patientName: 'Dmitrienko G.A.',
        birthDate: 19990923,
        patientAge: '019Y',
        patientWeight: 70,
        patientAddress: '',
        country: '',
        region: '',
        telephone: '',
        occupation: '',
        patientComments: [
            ''
        ],
        physicianName: '',
        physicianAddress: '',
        physicianPhoneNumbers: '',
        departmentName: '',
        performingPhysician: 'Demin D.S.',
        operatorName: 'Kovaleva V.K.',
        reviewDate: '',
        reviewTime: '',
        reviewerName: '',
        textComments: [
            ''
        ],
        globalComments: [
            'Comments that have been added manualy'
        ]
    }
]

const getData = async () => {
    return await LS.get(key, mock);
}

const setData = async (data) => {
    await LS.set(key, data);
}

const getAll = async (params) => {
    return await getData();
}

const getById = async (key) => {
    const data = await getData();
    return data.find(study => study.key === key);
}

const postComment = async (key, comment) => {
    const data = await getData();
    const study = data.find(study => study.key === key);
    study.globalComments.push(comment);
    await setData(value);
    return study;
}

const getInfo = async (key) => {
    const data = await getData();
    return data.find(study => study.key === key);
}

export default { getAll, getById, postComment, getInfo };