const firebaseRoot = 'newpaper';

const firebaseType = {
	realTime: {
		categoryTree: firebaseRoot + '/category',
		allPaper: firebaseRoot + '/papers',
		categoryTop: firebaseRoot+ '/categoryTop',
		paperByCategory: firebaseRoot + '/papersCategory/',
		relatedPaper: firebaseRoot+ '/papers',
		commentPaper: firebaseRoot+ '/comments',
		addComments: firebaseRoot+ '/addComments',
	},
	storeData: {
		paperDetail: 'detailContent',
	},
	storage: {

	},
}

export default firebaseType;