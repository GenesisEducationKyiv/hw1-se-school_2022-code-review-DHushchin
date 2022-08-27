build:
	docker build -t btc_auh_api .

remove:
	docker rmi -f btc_auh_api

run:
	docker run -d -p 3000:3000 --rm --name rate btc_auh_api
	
stop:
	docker stop rate
