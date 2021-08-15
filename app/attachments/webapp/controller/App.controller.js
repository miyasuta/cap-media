sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("miyasuta.attachments.controller.App", {
			onInit: function () {
				
			},

			onBeforeItemAdded: function (oEvent) {					
			},

			onAfterItemAdded: function (oEvent) {
				var item = oEvent.getParameter("item")
				this._createEntity(item)
				.then((id) => {
					this._uploadContent(item, id);
				})
				.catch((err) => {
					console.log(err);
				})
			},

			onBeforeUploadStarts: function (oEvent) {
				oEvent.getSource().getDefaultFileUploader().setUseMultipart(true);
				// var oUploadSet = oEvent.getSource();
				// oUploadSet.setHttpRequestMethod("PUT");
				// oUploadSet.getDefaultFileUploader().setUseMultipart(true);
				// var items = oUploadSet.getIncompleteItems();
				// var aPromise = [];
				// for (var i = 0; i < items.length; i++ ) {
				// 	aPromise.push(this._createEntity(items[i]))
				// 	this._createEntity(items[i])
				// }

				// Promise.all(aPromise)
				// .then((ids) => {
				// 	for (var i = 0; i < items.length; i++) {						
				// 		var url = `/attachments/Files(${ids[i]})/content`
				// 		items[i].setUploadUrl(url);	
				// 	}
				// })
			},

			onUploadCompleted: function (oEvent) {
				var oUploadSet = this.byId("uploadSet");
				oUploadSet.removeAllIncompleteItems();
				oUploadSet.getBinding("items").refresh();
			},

			onRemovePressed: function (oEvent) {
				oEvent.getParameter("item").getBindingContext().delete();		
			},

			_createEntity: function (item) {
				return new Promise((resolve, reject) => {
					var data = {
						mediaType: item.getMediaType(),
						fileName: item.getFileName(),
						size: item.getFileObject().size
					};
	
					var settings = {
						url: "/attachments/Files",
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						data: JSON.stringify(data)
					}
	
					$.ajax(settings)
						.done((results, textStatus, request) => {
							resolve(results.ID);
						})
						.fail((err) => {
							reject(err);
						})
				})				
			},

			_uploadContent: function (item, id) {
				var url = `/attachments/Files(${id})/content`
				item.setUploadUrl(url);	
				var oUploadSet = this.byId("uploadSet");
				oUploadSet.setHttpRequestMethod("PUT")
				oUploadSet.uploadItem(item);
			},

			getBaseURL: function () {
				var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
				var appPath = appId.replaceAll(".", "/");
				var appModulePath = jQuery.sap.getModulePath(appPath);
				return appModulePath;
			},  			
		});
	});
