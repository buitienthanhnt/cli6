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
		addLike: firebaseRoot+ '/addLike',
		addCommentLike: firebaseRoot+ '/addCommentLike',
	},
	storeData: {
		paperDetail: 'detailContent',
	},
	storage: {

	},
}

export default firebaseType;