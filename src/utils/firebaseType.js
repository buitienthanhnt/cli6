const firebaseRoot = 'newpaper';

const firebaseType = {
	realTime: {
		categoryTree: firebaseRoot + '/category',
		allPaper: firebaseRoot + '/papers',
		categoryTop: firebaseRoot+ '/categoryTop',
		paperByCategory: firebaseRoot + '/papersCategory/',
		relatedPaper: firebaseRoot+ '/papers',
	},
	storeData: {
		paperDetail: 'detailContent',
	},
	storage: {

	},
}

export default firebaseType;