import LS from './LSRequest';

const _key = 'study';

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

const get = async () => {
    let value = await LS.get();
    if (value[_key] === undefined) {
        value[_key] = [];
        await LS.set(value);
    }
    return value;
}

const getAll = async (params) => {
    let value = await get();
    if (value[_key].length === 0) {
        value[_key] = mock;
        await LS.set(value);
    }
    return value[_key];
}

const getById = async ({ key }) => {
    const value = await get();
    return value[_key].find(study => study.key === key);
}

const postComment = async ({ key, comment }) => {
    const value = await get();
    const study = value[_key].find(study => study.key === key);
    study.globalComments.push(comment);
    await LS.set(value);
    return study;
}

const getInfo = async ({ key }) => {
    const value = await get();
    return value[_key].find(study => study.key === key);
}

export default { getAll, getById, postComment, getInfo };