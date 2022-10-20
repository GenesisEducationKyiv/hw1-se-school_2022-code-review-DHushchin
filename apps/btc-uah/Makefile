build:
	docker build -t btc_uah_api .

remove:
	docker rmi -f btc_uah_api

run:
	docker run -d -p 3000:3000 --rm --name btc_uah_api btc_uah_api
	
stop:
	docker stop btc_uah_api
