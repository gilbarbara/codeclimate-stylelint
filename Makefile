.PHONY: image test

IMAGE_NAME ?= codeclimate/codeclimate-stylelint

image:
	docker build --rm -t $(IMAGE_NAME) .

test: image
	docker run \
	--workdir /usr/src/app \
	--rm $(IMAGE_NAME) \
	npm run test
