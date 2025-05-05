<?php

namespace App\Controller;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class QrCodeController extends AbstractController {

    public function __invoke(): Response
    {
        $url = $this->generateUrl('api_eleve_qrcode', [], UrlGeneratorInterface::ABSOLUTE_URL);

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
