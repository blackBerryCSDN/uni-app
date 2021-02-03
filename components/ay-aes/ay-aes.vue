<template>
</template>

<script>
	export default {
		props: {
			str: {
				type: String,
				default: 'Hello123',
			},
		},
		
		data() {
			return {
				navData: [],
				popupShow: false,
				showMask: false,
				actNav: null,

				selIndex: [] ,//选中条件索引
			};
		},
		created() {
			let that = this ;
			let encrypt_str = that.aes_encrypt(that.str)
			console.log(encrypt_str)
			let decrypt_str = that.aes_decrypt(encrypt_str)
			console.log(decrypt_str);
			let data = {
				encrypt_str : encrypt_str ,
				decrypt_str : decrypt_str ,
				
			}
			that.$emit('getAesendecrypt', data);
		},
		
		methods: {
			
		}
	};
</script>


<style>
</style>
