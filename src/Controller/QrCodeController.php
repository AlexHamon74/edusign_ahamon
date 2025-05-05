<?php

namespace App\Controller;

use App\Entity\Lesson;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class QrCodeController extends AbstractController {

    public function __invoke(Lesson $lesson): Response
    {
        $url = $this->generateUrl('api_sign_presence', ['id' => $lesson->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

        $builder = new Builder(
            writer: new PngWriter(),
            data: $url,
            size: 300,
            margin: 10
        );
        
        $qrCode = $builder->build();

        return new Response($qrCode->getString(), 200, [
            'Content-Type' => $qrCode->getMimeType()
        ]);
    }
}
